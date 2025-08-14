import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey
} from '@tanstack/react-query';
import { handleQueryError } from '../../../lib/react-query';

/**
 * Enhanced useQuery with consistent error handling
 */
export function useAppQuery<TData = unknown, TError = unknown>(
  options: Parameters<typeof useQuery<TData, TError>>[0]
) {
  return useQuery({
    ...options,
    throwOnError: false // We handle errors manually
  });
}

/**
 * Enhanced useMutation with consistent error handling and optimistic updates
 */
export function useAppMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void
>(
  options: Parameters<typeof useMutation<TData, TError, TVariables>>[0] & {
    invalidateQueries?: QueryKey[];
    optimisticUpdate?: {
      queryKey: QueryKey;
      updater: (old: any, variables: TVariables) => any;
    };
  }
) {
  const queryClient = useQueryClient();
  const { invalidateQueries, optimisticUpdate, ...mutationOptions } = options;

  return useMutation({
    ...mutationOptions,
    onMutate: async (variables) => {
      // Call original onMutate if provided
      if (mutationOptions.onMutate) {
        await mutationOptions.onMutate(variables);
      }

      // Handle optimistic updates
      if (optimisticUpdate) {
        await queryClient.cancelQueries({
          queryKey: optimisticUpdate.queryKey
        });

        const previousData = queryClient.getQueryData(
          optimisticUpdate.queryKey
        );

        queryClient.setQueryData(optimisticUpdate.queryKey, (old: any) =>
          optimisticUpdate.updater(old, variables)
        );

        return { previousData };
      }
    },
    onSuccess: (data, variables, context) => {
      // Invalidate queries after successful mutation
      if (invalidateQueries) {
        invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }

      // Call original onSuccess if provided
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      // Rollback optimistic updates on error
      if (optimisticUpdate && context?.previousData) {
        queryClient.setQueryData(
          optimisticUpdate.queryKey,
          context.previousData
        );
      }

      // Call original onError if provided
      if (mutationOptions.onError) {
        mutationOptions.onError(error, variables, context);
      }
    }
  });
}

/**
 * Hook to get formatted error message from React Query error
 */
export function useQueryError(error: unknown) {
  if (!error) return null;
  return handleQueryError(error);
}

/**
 * Hook to prefetch data
 */
export function usePrefetch() {
  const queryClient = useQueryClient();

  const prefetchQuery = <TData = unknown>(
    queryKey: string[],
    queryFn: () => Promise<TData>,
    staleTime = 1000 * 60 * 5 // 5 minutes
  ) => {
    return queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime
    });
  };

  return { prefetchQuery };
}
