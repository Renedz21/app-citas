import { queryKeys } from '@/lib/react-query';
import type {
  AppointmentWithDetails,
  AppError,
  QueryConfig,
  MutationConfig,
  CreateAppointmentData
} from '@/types';
import { type UseQueryResult } from '@tanstack/react-query';
import {
  useAppQuery,
  useAppMutation
} from '@/modules/core/hooks/use-query-helpers';
import {
  getAppointments,
  getAppointmentById,
  createAppointment
} from '@/modules/services/appointments';

export function useGetAppointments(
  config?: QueryConfig<AppointmentWithDetails[]>
): UseQueryResult<AppointmentWithDetails[], AppError> {
  return useAppQuery<AppointmentWithDetails[], AppError>({
    queryKey: queryKeys.appointmentsList(),
    queryFn: () => getAppointments(),
    ...config
  });
}

export function useGetAppointmentById(
  id: string,
  config?: QueryConfig<AppointmentWithDetails | null>
): UseQueryResult<AppointmentWithDetails | null, AppError> {
  return useAppQuery<AppointmentWithDetails | null, AppError>({
    queryKey: queryKeys.appointmentDetail(id),
    queryFn: () => getAppointmentById(id),
    enabled: Boolean(id) && (config?.enabled ?? true),
    ...config
  });
}

export function useCreateAppointment(
  config?: MutationConfig<AppointmentWithDetails, CreateAppointmentData>
) {
  return useAppMutation<
    AppointmentWithDetails,
    AppError,
    CreateAppointmentData
  >({
    mutationFn: (input) => createAppointment(input),
    invalidateQueries: [queryKeys.appointmentsList()],
    ...config
  });
}
