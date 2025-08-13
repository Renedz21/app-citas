import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useGetAppointments,
  useGetAppointmentById,
  useCreateAppointment
} from '@/modules/core/hooks/appointments/use-appointments';
import * as appointmentService from '@/modules/services/appointments';

// Mock the appointment service
jest.mock('@/modules/services/appointments');

// Mock the query helpers
jest.mock('@/modules/core/hooks/use-query-helpers', () => ({
  useAppQuery: jest.fn((options) => {
    const { useQuery } = require('@tanstack/react-query');
    // Properly pass through all options including enabled
    return useQuery({
      ...options,
      throwOnError: false
    });
  }),
  useAppMutation: jest.fn((options) => {
    const { useMutation } = require('@tanstack/react-query');
    return useMutation(options);
  })
}));

const mockAppointments = [
  {
    id: '1',
    starts_at: '2024-01-15T10:00:00',
    duration_minutes: 60,
    status: 'confirmed',
    notes: 'Test appointment',
    client: { id: 'c1', name: 'John Doe', phone: '123456789' },
    user_service: {
      custom_name: 'Custom Service',
      duration_minutes: 60,
      service: { name: 'Basic Service' }
    }
  },
  {
    id: '2',
    starts_at: '2024-01-15T14:00:00',
    duration_minutes: 90,
    status: 'scheduled',
    notes: null,
    client: { id: 'c2', name: 'Jane Smith', phone: '987654321' },
    user_service: {
      custom_name: null,
      duration_minutes: 90,
      service: { name: 'Premium Service' }
    }
  }
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useGetAppointments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch appointments successfully', async () => {
    (appointmentService.getAppointments as jest.Mock).mockResolvedValue(
      mockAppointments
    );

    const { result } = renderHook(() => useGetAppointments(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockAppointments);
    expect(appointmentService.getAppointments).toHaveBeenCalled();
  });

  it('should handle error when fetching appointments', async () => {
    const error = new Error('Network error');
    (appointmentService.getAppointments as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useGetAppointments(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
  });

  it('should respect custom config options', async () => {
    const { result } = renderHook(
      () => useGetAppointments(undefined, { enabled: false }),
      { wrapper: createWrapper() }
    );

    // Wait for the hook to settle
    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    expect(appointmentService.getAppointments).not.toHaveBeenCalled();
  });
});

describe('useGetAppointmentById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch appointment by id successfully', async () => {
    const appointmentId = '1';
    (appointmentService.getAppointmentById as jest.Mock).mockResolvedValue(
      mockAppointments[0]
    );

    const { result } = renderHook(
      () => useGetAppointmentById(appointmentId),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockAppointments[0]);
    expect(appointmentService.getAppointmentById).toHaveBeenCalledWith(
      appointmentId
    );
  });

  it('should not fetch when id is empty', () => {
    const { result } = renderHook(() => useGetAppointmentById(''), {
      wrapper: createWrapper()
    });

    expect(result.current.isLoading).toBe(false);
    expect(appointmentService.getAppointmentById).not.toHaveBeenCalled();
  });

  it('should handle null response', async () => {
    (appointmentService.getAppointmentById as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => useGetAppointmentById('999'), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeNull();
  });
});

describe('useCreateAppointment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create appointment successfully', async () => {
    const newAppointment = {
      client_id: 'c1',
      service_id: 's1',
      starts_at: '2024-01-20T10:00:00',
      duration_minutes: 60,
      notes: 'New appointment'
    };

    const createdAppointment = { ...mockAppointments[0], id: '3' };
    (appointmentService.createAppointment as jest.Mock).mockResolvedValue(
      createdAppointment
    );

    const { result } = renderHook(() => useCreateAppointment(), {
      wrapper: createWrapper()
    });

    result.current.mutate(newAppointment);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(createdAppointment);
    expect(appointmentService.createAppointment).toHaveBeenCalledWith(
      newAppointment
    );
  });

  it('should handle creation error', async () => {
    const error = new Error('Validation error');
    (appointmentService.createAppointment as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useCreateAppointment(), {
      wrapper: createWrapper()
    });

    result.current.mutate({
      client_id: 'c1',
      service_id: 's1',
      starts_at: '2024-01-20T10:00:00',
      duration_minutes: 60,
      notes: ''
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
  });

  it('should call custom onSuccess callback', async () => {
    const onSuccess = jest.fn();
    const createdAppointment = { ...mockAppointments[0], id: '4' };
    (appointmentService.createAppointment as jest.Mock).mockResolvedValue(
      createdAppointment
    );

    const { result } = renderHook(
      () => useCreateAppointment({ onSuccess }),
      { wrapper: createWrapper() }
    );

    result.current.mutate({
      client_id: 'c1',
      service_id: 's1',
      starts_at: '2024-01-20T10:00:00',
      duration_minutes: 60,
      notes: 'Test'
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(onSuccess).toHaveBeenCalledWith(
      createdAppointment,
      expect.any(Object),
      undefined
    );
  });
});
