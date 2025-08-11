import { queryKeys } from '@/lib/react-query';
import { Appointment, AppointmentWithDetails } from '@/types';
import { useQuery } from '@tanstack/react-query';
import {
  getAppointments,
  getAppointmentById
} from '@/modules/services/appointments';

export function useGetAppointments() {
  return useQuery<AppointmentWithDetails[]>({
    queryKey: queryKeys.appointments,
    queryFn: () => getAppointments()
  });
}

export function useGetAppointmentById(id: string) {
  return useQuery({
    queryKey: queryKeys.appointmentDetail(id),
    queryFn: () => getAppointmentById(id)
  });
}
