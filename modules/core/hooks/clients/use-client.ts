import { queryKeys } from '@/lib/react-query';
import type { FullClient, ClientFilters, QueryConfig } from '@/types/entities';
import { type UseQueryResult } from '@tanstack/react-query';
import { useAppQuery } from '../use-query-helpers';
import { getClientById, getClients } from '@/modules/services/clients';

export function useGetClients(
  filters?: ClientFilters,
  config?: QueryConfig<FullClient[]>
): UseQueryResult<FullClient[], Error> {
  return useAppQuery<FullClient[], Error>({
    queryKey: queryKeys.clientsList(),
    queryFn: () => getClients(filters),
    ...config,
    // Ensure enabled is respected
    ...(config?.enabled !== undefined && { enabled: config.enabled })
  });
}

export function useGetClientById(
  id: string,
  config?: QueryConfig<FullClient>
): UseQueryResult<FullClient, Error> {
  return useAppQuery<FullClient, Error>({
    queryKey: queryKeys.clientDetail(id),
    queryFn: () => getClientById(id),
    ...config,
    // Ensure enabled is respected
    ...(config?.enabled !== undefined && { enabled: config.enabled })
  });
}
