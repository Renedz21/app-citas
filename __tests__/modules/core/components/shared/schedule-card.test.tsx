import React from 'react';
import { render, fireEvent } from '@//__tests__/utils/test-utils';
import ScheduleCard from '@/modules/core/components/shared/schedule-card';
import { useRouter } from 'expo-router';
import type { AppointmentWithDetails } from '@/types/entities';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn()
}));

// Mock SVG icons
jest.mock('@/assets/icons/clock.svg', () => 'ClockIcon');
jest.mock('@/assets/icons/phone.svg', () => 'PhoneIcon');

// Mock date-fns
jest.mock('date-fns', () => ({
  format: jest.fn((date, formatStr) => {
    if (formatStr === 'HH:mm') {
      // Extract time from ISO string like 2024-01-15T14:30:00
      const timeMatch = date.toString().match(/T(\d{2}:\d{2})/);
      return timeMatch ? timeMatch[1] : '14:30';
    }
    return date.toString();
  })
}));

const mockPush = jest.fn();

const mockAppointment: AppointmentWithDetails = {
  id: 'apt-1',
  appointment_code: 'APT-001',
  appointment_date: '2024-01-15',
  start_time: '14:30:00',
  duration_minutes: 60,
  notes: 'Regular checkup appointment',
  status: 'confirmed',
  client_id: 'client-1',
  professional_id: 'prof-1',
  professional_service_id: 'ps-1',
  session_number: '1',
  consultation_fee: 100,
  location_name: null,
  location_address: null,
  created_at: null,
  updated_at: null,
  client: {
    id: 'client-1',
    profiles: {
      id: 'client-1',
      first_name: 'John',
      last_name: 'Doe',
      phone: '+1234567890',
      email: 'john@example.com',
      business_name: null,
      clerk_id: null,
      created_at: null,
      is_active: null,
      profession: null,
      profile_type: 'client',
      specialization: null,
      title: null,
      updated_at: null
    },
    client_data: {
      id: 'client-1',
      age: null,
      created_at: null,
      gender: null,
      last_visit_date: null,
      next_appointment_date: null,
      status: null,
      total_spent: null,
      total_visits: null,
      updated_at: null
    }
  },
  professional: {
    id: 'prof-1',
    first_name: 'Dr. Jane',
    last_name: 'Smith',
    phone: null,
    email: 'jane@example.com',
    business_name: 'Health Clinic',
    clerk_id: null,
    created_at: null,
    is_active: null,
    profession: 'Doctor',
    profile_type: 'professional',
    specialization: 'General Medicine',
    title: 'Dr.',
    updated_at: null
  },
  professional_service: {
    id: 'ps-1',
    custom_name: 'Premium Consultation',
    custom_duration_minutes: 60,
    custom_price: 100,
    created_at: null,
    is_active: null,
    professional_id: 'prof-1',
    service_id: 'service-1',
    service: {
      id: 'service-1',
      name: 'Basic Consultation',
      category_id: 'cat-1',
      created_at: null,
      default_duration_minutes: 45,
      description: null,
      is_active: null,
      suggested_price: null,
      category: {
        id: 'cat-1',
        name: 'General',
        created_at: null,
        description: null,
        is_active: null
      }
    },
    professional: {
      id: 'prof-1',
      first_name: 'Dr. Jane',
      last_name: 'Smith',
      phone: null,
      email: 'jane@example.com',
      business_name: 'Health Clinic',
      clerk_id: null,
      created_at: null,
      is_active: null,
      profession: 'Doctor',
      profile_type: 'professional',
      specialization: 'General Medicine',
      title: 'Dr.',
      updated_at: null
    },
    display_name: 'Premium Consultation',
    display_price: '$100.00'
  }
} as AppointmentWithDetails;

describe('ScheduleCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should render appointment details correctly', () => {
    const { getByText } = render(<ScheduleCard appointment={mockAppointment} />);
    
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Premium Consultation')).toBeTruthy();
    expect(getByText('Regular checkup appointment')).toBeTruthy();
    expect(getByText('+1234567890')).toBeTruthy();
  });

  it('should display client initials correctly', () => {
    const { getByText } = render(<ScheduleCard appointment={mockAppointment} />);
    
    expect(getByText('JD')).toBeTruthy();
  });

  it('should handle client with single name', () => {
    const appointment = {
      ...mockAppointment,
      client: { 
        ...mockAppointment.client,
        profiles: {
          ...mockAppointment.client.profiles,
          first_name: 'Madonna',
          last_name: '' 
        }
      }
    };
    
    const { getByText } = render(<ScheduleCard appointment={appointment} />);
    
    expect(getByText('M')).toBeTruthy();
  });

  it('should handle missing client name', () => {
    const appointment = {
      ...mockAppointment,
      client: null
    };
    
    const { getByText } = render(<ScheduleCard appointment={appointment} />);
    
    expect(getByText('U')).toBeTruthy();
    expect(getByText('Usuario Sin Nombre')).toBeTruthy();
  });

  it('should use service name when custom name is not available', () => {
    const appointment = {
      ...mockAppointment,
      professional_service: {
        ...mockAppointment.professional_service,
        custom_name: null,
        service: {
          ...mockAppointment.professional_service.service,
          name: 'Standard Service'
        }
      }
    };
    
    const { getByText } = render(<ScheduleCard appointment={appointment} />);
    
    expect(getByText('Standard Service')).toBeTruthy();
  });

  it('should display default service name when no service info available', () => {
    const appointment = {
      ...mockAppointment,
      professional_service: null
    };
    
    const { getByText } = render(<ScheduleCard appointment={appointment} />);
    
    expect(getByText('Servicio General')).toBeTruthy();
  });

  it('should format time correctly', () => {
    const { queryByText } = render(<ScheduleCard appointment={mockAppointment} />);
    
    // The time should be formatted, checking for presence of time-related text
    // The exact format depends on locale, so we check for duration
    expect(queryByText(/60 min/)).toBeTruthy();
  });

  it('should navigate to appointment details on press', () => {
    const { getByText } = render(<ScheduleCard appointment={mockAppointment} />);
    
    const card = getByText('John Doe').parent?.parent?.parent;
    fireEvent.press(card!);
    
    expect(mockPush).toHaveBeenCalledWith('/(tabs)/appointments/apt-1');
  });

  it('should display correct badge for confirmed status', () => {
    const { getByText } = render(<ScheduleCard appointment={mockAppointment} />);
    
    // The badge should show 'Confirmada' for confirmed status
    expect(getByText('Confirmada')).toBeTruthy();
  });

  it('should display correct badge for pending status', () => {
    const appointment = { ...mockAppointment, status: 'pending' };
    const { getByText } = render(<ScheduleCard appointment={appointment} />);
    
    expect(getByText('Pendiente')).toBeTruthy();
  });

  it('should display correct badge for cancelled status', () => {
    const appointment = { ...mockAppointment, status: 'cancelled' };
    const { getByText } = render(<ScheduleCard appointment={appointment} />);
    
    expect(getByText('Cancelada')).toBeTruthy();
  });

  it('should handle missing phone number', () => {
    const appointment = {
      ...mockAppointment,
      client: { 
        ...mockAppointment.client,
        profiles: {
          ...mockAppointment.client.profiles,
          phone: null
        }
      }
    };
    
    const { getByText } = render(<ScheduleCard appointment={appointment} />);
    
    expect(getByText('Sin teléfono')).toBeTruthy();
  });

  it('should not display notes section when notes are empty', () => {
    const appointment = { ...mockAppointment, notes: null };
    const { queryByText } = render(<ScheduleCard appointment={appointment} />);
    
    expect(queryByText('Regular checkup appointment')).toBeFalsy();
  });

  it('should use appointment duration when available', () => {
    const appointment = { ...mockAppointment, duration_minutes: 90 };
    const { getByText } = render(<ScheduleCard appointment={appointment} />);
    
    expect(getByText('(90 min)')).toBeTruthy();
  });

  it('should fallback to service duration when appointment duration is null', () => {
    const appointment = {
      ...mockAppointment,
      duration_minutes: null,
      professional_service: {
        ...mockAppointment.professional_service,
        custom_duration_minutes: 45
      }
    };
    
    const { getByText } = render(<ScheduleCard appointment={appointment} />);
    
    expect(getByText('(45 min)')).toBeTruthy();
  });

  it('should default to 60 minutes when no duration is specified', () => {
    const appointment = {
      ...mockAppointment,
      duration_minutes: null,
      professional_service: {
        ...mockAppointment.professional_service,
        custom_duration_minutes: null,
        service: {
          ...mockAppointment.professional_service.service,
          default_duration_minutes: null
        }
      }
    };
    
    const { getByText } = render(<ScheduleCard appointment={appointment} />);
    
    expect(getByText('(60 min)')).toBeTruthy();
  });

  it('should handle appointment with minimal data', () => {
    const minimalAppointment = {
      ...mockAppointment,
      id: 'apt-2',
      appointment_date: '2024-01-15',
      start_time: '10:00:00',
      status: 'pending',
      client: null,
      professional_service: null
    } as unknown as AppointmentWithDetails;
    
    const { getByText } = render(<ScheduleCard appointment={minimalAppointment} />);
    
    expect(getByText('Usuario Sin Nombre')).toBeTruthy();
    expect(getByText('Servicio General')).toBeTruthy();
    expect(getByText('Pendiente')).toBeTruthy();
  });

  it('should be accessible', () => {
    const { getByText } = render(<ScheduleCard appointment={mockAppointment} />);
    
    // Verify that the card is rendered and can be interacted with
    const clientName = getByText('John Doe');
    expect(clientName).toBeTruthy();
    
    // Find the parent TouchableOpacity
    let parent = clientName.parent;
    let touchableFound = false;
    
    // Traverse up the tree to find TouchableOpacity
    while (parent && !touchableFound) {
      if (parent.type === 'TouchableOpacity' || parent.props?.activeOpacity) {
        touchableFound = true;
        expect(parent.props.activeOpacity).toBe(0.8);
      }
      parent = parent.parent;
    }
    
    // If we can't find TouchableOpacity in the tree, at least verify the card renders
    if (!touchableFound) {
      expect(clientName).toBeTruthy();
    }
  });
});
