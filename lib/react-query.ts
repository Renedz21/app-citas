import { QueryClient } from '@tanstack/react-query';

/**
 * React Query configuration optimized for React Native
 *
 * Key optimizations:
 * - Reduced retry attempts for mobile networks
 * - Shorter stale times to keep data fresh
 * - Network-aware caching strategies
 * - Optimistic retry behavior
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes by default
      staleTime: 1000 * 60 * 5,

      // Keep data in cache for 10 minutes after last usage
      gcTime: 1000 * 60 * 10,

      // Retry failed requests 2 times (reduced from default 3 for mobile)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx client errors
        if (error?.status >= 400 && error?.status < 500) return false;
        // Retry up to 2 times for network errors
        return failureCount < 2;
      },

      // Delay between retries (exponential backoff)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Disable automatic refetch on window focus (not applicable in RN)
      refetchOnWindowFocus: false,

      // Refetch on reconnect (important for mobile)
      refetchOnReconnect: true,

      // Refetch when component mounts if data is stale
      refetchOnMount: true
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,

      // Show network errors immediately
      retryDelay: 1000,

      // Pause mutations when offline (requires network connection)
      networkMode: 'online'
    }
  }
});

/**
 * Query keys factory - centralized key management
 */
export const queryKeys = {
  // Auth
  auth: ['auth'] as const,
  currentUser: () => [...queryKeys.auth, 'current-user'] as const,

  // Appointments
  appointments: ['appointments'] as const,
  appointmentsList: (filters?: Record<string, any>) =>
    [...queryKeys.appointments, 'list', filters ?? {}] as const,
  appointmentDetail: (id: string) =>
    [...queryKeys.appointments, 'detail', id] as const,

  // Clients
  clients: ['clients'] as const,
  clientsList: (filters?: Record<string, any>) =>
    [...queryKeys.clients, 'list', filters ?? {}] as const,
  clientDetail: (id: string) => [...queryKeys.clients, 'detail', id] as const
} as const;

/**
 * Common error handling
 */
export const handleQueryError = (error: any) => {
  console.error('Query error:', error);

  // Handle specific error types
  if (error?.status === 401) {
    // Handle unauthorized - maybe redirect to login
    return 'Please log in to continue';
  }

  if (error?.status >= 500) {
    return 'Server error. Please try again later.';
  }

  // Check for network-related errors instead of navigator.onLine
  if (
    error?.code === 'NETWORK_ERROR' ||
    error?.message?.includes('Network Error')
  ) {
    return 'No internet connection. Please check your network.';
  }

  return error?.message || 'Something went wrong. Please try again.';
};
