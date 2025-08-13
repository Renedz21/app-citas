import { renderHook, act, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useAppQuery,
  useAppMutation,
  useQueryError,
  usePrefetch
} from '@/modules/core/hooks/use-query-helpers';
import { handleQueryError } from '@/lib/react-query';

// Mock the handleQueryError function
jest.mock('@/lib/react-query', () => ({
  handleQueryError: jest.fn((error) => `Error: ${error.message}`)
}));

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

describe('useAppQuery', () => {
  it('should execute query successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    const queryFn = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(
      () => useAppQuery({
        queryKey: ['test'],
        queryFn
      }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    expect(queryFn).toHaveBeenCalled();
  });

  it('should handle query error', async () => {
    const error = new Error('Query failed');
    const queryFn = jest.fn().mockRejectedValue(error);

    const { result } = renderHook(
      () => useAppQuery({
        queryKey: ['test-error'],
        queryFn
      }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
  });

  it('should not throw on error', async () => {
    const error = new Error('Should not throw');
    const queryFn = jest.fn().mockRejectedValue(error);

    const { result } = renderHook(
      () => useAppQuery({
        queryKey: ['no-throw'],
        queryFn
      }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    // Should not throw, just set error state
    expect(result.current.error).toEqual(error);
  });
});

describe('useAppMutation', () => {
  it('should execute mutation successfully', async () => {
    const mockData = { id: 1, created: true };
    const mutationFn = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(
      () => useAppMutation({
        mutationFn
      }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.mutate({ test: 'data' });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    expect(mutationFn).toHaveBeenCalledWith({ test: 'data' });
  });

  it('should invalidate queries on success', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    });
    
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');
    
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      const Provider = QueryClientProvider as any;
      return React.createElement(Provider, { client: queryClient }, children);
    };

    const mutationFn = jest.fn().mockResolvedValue({ success: true });

    const { result } = renderHook(
      () => useAppMutation({
        mutationFn,
        invalidateQueries: [['test-query'], ['another-query']]
      }),
      { wrapper }
    );

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['test-query'] });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['another-query'] });
  });

  it('should handle optimistic updates', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => {
      const Provider = QueryClientProvider as any;
      return React.createElement(Provider, { client: queryClient }, children);
    };

    // Set initial data
    queryClient.setQueryData(['items'], [{ id: 1, name: 'Item 1' }]);

    const mutationFn = jest.fn().mockResolvedValue({ id: 2, name: 'Item 2' });

    const { result } = renderHook(
      () => useAppMutation({
        mutationFn,
        optimisticUpdate: {
          queryKey: ['items'],
          updater: (old: any[], variables: any) => {
            // Ensure old is an array
            if (!Array.isArray(old)) return [variables];
            return [...old, variables];
          }
        }
      }),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({ id: 2, name: 'Item 2' });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Check optimistic update was applied
    const finalData = queryClient.getQueryData(['items']);
    expect(finalData).toEqual([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]);
  });

  it('should rollback optimistic updates on error', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => {
      const Provider = QueryClientProvider as any;
      return React.createElement(Provider, { client: queryClient }, children);
    };

    const originalData = [{ id: 1, name: 'Item 1' }];
    queryClient.setQueryData(['items'], originalData);

    const mutationFn = jest.fn().mockRejectedValue(new Error('Failed'));

    const { result } = renderHook(
      () => useAppMutation({
        mutationFn,
        optimisticUpdate: {
          queryKey: ['items'],
          updater: (old: any[], variables: any) => [...old, variables]
        }
      }),
      { wrapper }
    );

    act(() => {
      result.current.mutate({ id: 2, name: 'Item 2' });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    // Check data was rolled back
    const rolledBackData = queryClient.getQueryData(['items']);
    expect(rolledBackData).toEqual(originalData);
  });

  it('should call custom callbacks', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const onMutate = jest.fn();

    const mutationFn = jest.fn().mockResolvedValue({ success: true });

    const { result } = renderHook(
      () => useAppMutation({
        mutationFn,
        onSuccess,
        onError,
        onMutate
      }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.mutate({ test: 'data' });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(onMutate).toHaveBeenCalledWith({ test: 'data' });
    expect(onSuccess).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });
});

describe('useQueryError', () => {
  it('should return null for no error', () => {
    const { result } = renderHook(() => useQueryError(null));
    
    expect(result.current).toBeNull();
  });

  it('should handle error object', () => {
    const error = new Error('Test error');
    const { result } = renderHook(() => useQueryError(error));
    
    expect(result.current).toBe('Error: Test error');
    expect(handleQueryError).toHaveBeenCalledWith(error);
  });

  it('should handle string error', () => {
    const error = 'String error';
    const { result } = renderHook(() => useQueryError(error));
    
    expect(handleQueryError).toHaveBeenCalledWith(error);
  });
});

describe('usePrefetch', () => {
  it('should prefetch query data', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false }
      }
    });

    const prefetchSpy = jest.spyOn(queryClient, 'prefetchQuery');

    const wrapper = ({ children }: { children: React.ReactNode }) => {
      const Provider = QueryClientProvider as any;
      return React.createElement(Provider, { client: queryClient }, children);
    };

    const mockData = { id: 1, name: 'Prefetched' };
    const queryFn = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => usePrefetch(), { wrapper });

    await act(async () => {
      await result.current.prefetchQuery(['prefetch-test'], queryFn);
    });

    expect(prefetchSpy).toHaveBeenCalledWith({
      queryKey: ['prefetch-test'],
      queryFn,
      staleTime: 1000 * 60 * 5 // 5 minutes default
    });
    expect(queryFn).toHaveBeenCalled();
  });

  it('should use custom stale time', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false }
      }
    });

    const prefetchSpy = jest.spyOn(queryClient, 'prefetchQuery');

    const wrapper = ({ children }: { children: React.ReactNode }) => {
      const Provider = QueryClientProvider as any;
      return React.createElement(Provider, { client: queryClient }, children);
    };

    const queryFn = jest.fn().mockResolvedValue({});
    const customStaleTime = 1000 * 60 * 10; // 10 minutes

    const { result } = renderHook(() => usePrefetch(), { wrapper });

    await act(async () => {
      await result.current.prefetchQuery(
        ['custom-stale'],
        queryFn,
        customStaleTime
      );
    });

    expect(prefetchSpy).toHaveBeenCalledWith({
      queryKey: ['custom-stale'],
      queryFn,
      staleTime: customStaleTime
    });
  });
});
