import { queryKeys } from '@/lib/react-query';
import { QueryConfig, Client, AppError, ClientWithDetails } from '@/types';
import { type UseQueryResult } from '@tanstack/react-query';
import { useAppQuery } from '../use-query-helpers';
import { getClientById, getClients } from '@/modules/services/clients';

export function useGetClients(
  config?: QueryConfig<Client[]>
): UseQueryResult<Client[], AppError> {
  return useAppQuery<Client[], AppError>({
    queryKey: queryKeys.clientsList(),
    queryFn: () => getClients(),
    ...config
  });
}

export function useGetClientById(
  id: string,
  config?: QueryConfig<ClientWithDetails>
): UseQueryResult<ClientWithDetails, AppError> {
  return useAppQuery<ClientWithDetails, AppError>({
    queryKey: queryKeys.clientDetail(id),
    queryFn: () => getClientById(id),
    ...config
  });
}
