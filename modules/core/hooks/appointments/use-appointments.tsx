import { queryKeys } from '@/lib/react-query';
import type {
  AppointmentWithDetails,
  CreateAppointmentData,
  AppointmentFilters,
  QueryConfig
} from '@/types/entities';
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

interface MutationConfig<TData = unknown, TVariables = unknown> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
}

export function useGetAppointments(
  filters?: AppointmentFilters,
  config?: QueryConfig<AppointmentWithDetails[]>
): UseQueryResult<AppointmentWithDetails[], Error> {
  return useAppQuery<AppointmentWithDetails[], Error>({
    queryKey: queryKeys.appointmentsList(filters),
    queryFn: () => getAppointments(filters),
    ...config,
    ...(config?.enabled !== undefined && { enabled: config.enabled })
  });
}

export function useGetAppointmentById(
  id: string,
  config?: QueryConfig<AppointmentWithDetails | null>
): UseQueryResult<AppointmentWithDetails | null, Error> {
  return useAppQuery<AppointmentWithDetails | null, Error>({
    queryKey: queryKeys.appointmentDetail(id),
    queryFn: () => getAppointmentById(id),
    enabled: Boolean(id) && (config?.enabled ?? true),
    ...config
  });
}

export function useCreateAppointment(
  config?: MutationConfig<AppointmentWithDetails, CreateAppointmentData>
) {
  return useAppMutation<AppointmentWithDetails, Error, CreateAppointmentData>({
    mutationFn: (input) => createAppointment(input),
    invalidateQueries: [queryKeys.appointmentsList()],
    ...config
  });
}
