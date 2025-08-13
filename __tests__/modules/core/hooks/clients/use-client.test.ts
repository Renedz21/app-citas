import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useGetClients,
  useGetClientById
} from '@/modules/core/hooks/clients/use-client';
import * as clientService from '@/modules/services/clients';

// Mock the client service
jest.mock('@/modules/services/clients');

// Mock the query helpers
jest.mock('@/modules/core/hooks/use-query-helpers', () => ({
  useAppQuery: jest.fn((options) => {
    const { useQuery } = require('@tanstack/react-query');
    // Properly pass through all options including enabled
    return useQuery({
      ...options,
      throwOnError: false
    });
  })
}));

const mockClients = [
  {
    id: 'c1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123456789',
    created_at: '2024-01-01T00:00:00'
  },
  {
    id: 'c2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987654321',
    created_at: '2024-01-02T00:00:00'
  }
];

const mockClientWithDetails = {
  id: 'c1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123456789',
  created_at: '2024-01-01T00:00:00',
  appointments: [
    {
      id: 'a1',
      starts_at: '2024-01-15T10:00:00',
      status: 'confirmed'
    }
  ],
  total_appointments: 5,
  last_appointment: '2024-01-10T14:00:00'
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  return ({ children }: { children: React.ReactNode }) => {
    const Provider = QueryClientProvider as any;
    return React.createElement(Provider, { client: queryClient }, children);
  };
};

describe('useGetClients', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch clients successfully', async () => {
    (clientService.getClients as jest.Mock).mockResolvedValue(mockClients);

    const { result } = renderHook(() => useGetClients(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockClients);
    expect(clientService.getClients).toHaveBeenCalled();
  });

  it('should handle error when fetching clients', async () => {
    const error = new Error('Failed to fetch clients');
    (clientService.getClients as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useGetClients(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle empty client list', async () => {
    (clientService.getClients as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useGetClients(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
  });

  it('should respect custom config options', async () => {
    const { result } = renderHook(
      () => useGetClients(undefined, { enabled: false }),
      { wrapper: createWrapper() }
    );

    // Wait for the hook to settle
    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    expect(clientService.getClients).not.toHaveBeenCalled();
  });

  it('should refetch data when requested', async () => {
    (clientService.getClients as jest.Mock).mockResolvedValue(mockClients);

    const { result } = renderHook(() => useGetClients(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(clientService.getClients).toHaveBeenCalledTimes(1);

    result.current.refetch();

    await waitFor(() => {
      expect(clientService.getClients).toHaveBeenCalledTimes(2);
    });
  });
});

describe('useGetClientById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch client by id successfully', async () => {
    const clientId = 'c1';
    (clientService.getClientById as jest.Mock).mockResolvedValue(
      mockClientWithDetails
    );

    const { result } = renderHook(() => useGetClientById(clientId), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockClientWithDetails);
    expect(clientService.getClientById).toHaveBeenCalledWith(clientId);
  });

  it('should handle non-existent client', async () => {
    const clientId = 'non-existent';
    const error = new Error('Client not found');
    (clientService.getClientById as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useGetClientById(clientId), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle empty client id', () => {
    const { result } = renderHook(() => useGetClientById(''), {
      wrapper: createWrapper()
    });

    // Should still attempt to fetch with empty id
    expect(result.current.isLoading).toBe(true);
  });

  it('should cache client data properly', async () => {
    const clientId = 'c1';
    (clientService.getClientById as jest.Mock).mockResolvedValue(
      mockClientWithDetails
    );

    // Create a single wrapper with shared QueryClient for cache testing
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { 
          retry: false,
          staleTime: 1000 * 60 * 5 // 5 minutes
        },
        mutations: { retry: false }
      }
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => {
      const Provider = QueryClientProvider as any;
      return React.createElement(Provider, { client: queryClient }, children);
    };

    const { result: result1 } = renderHook(
      () => useGetClientById(clientId),
      { wrapper }
    );

    await waitFor(() => {
      expect(result1.current.isSuccess).toBe(true);
    });

    expect(clientService.getClientById).toHaveBeenCalledTimes(1);
    expect(result1.current.data).toEqual(mockClientWithDetails);

    // Second hook with same id should use cached data from same QueryClient
    const { result: result2 } = renderHook(
      () => useGetClientById(clientId),
      { wrapper }
    );

    // Data should be immediately available from cache
    expect(result2.current.data).toEqual(mockClientWithDetails);
    expect(result2.current.isSuccess).toBe(true);
    
    // Service should still only be called once due to caching
    expect(clientService.getClientById).toHaveBeenCalledTimes(1);
  });

  it('should handle network timeout', async () => {
    const clientId = 'c1';
    const timeoutError = new Error('Network timeout');
    (clientService.getClientById as jest.Mock).mockRejectedValue(timeoutError);

    const { result } = renderHook(() => useGetClientById(clientId), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(timeoutError);
  });

  it('should update when client id changes', async () => {
    (clientService.getClientById as jest.Mock)
      .mockResolvedValueOnce(mockClientWithDetails)
      .mockResolvedValueOnce(mockClients[1]);

    const { result, rerender } = renderHook(
      ({ id }) => useGetClientById(id),
      {
        wrapper: createWrapper(),
        initialProps: { id: 'c1' }
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockClientWithDetails);

    rerender({ id: 'c2' });

    await waitFor(() => {
      expect(clientService.getClientById).toHaveBeenCalledWith('c2');
    });
  });
});
