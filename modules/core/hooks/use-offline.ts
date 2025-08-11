import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNetInfo } from '@react-native-community/netinfo';

/**
 * Hook for handling offline scenarios and network state
 *
 * Provides:
 * - Network connectivity status
 * - Queued mutations for offline mode
 * - Auto-sync when coming back online
 */
export function useOfflineSupport() {
  const netInfo = useNetInfo();
  const queryClient = useQueryClient();
  const [wasOffline, setWasOffline] = useState(false);

  const isOnline = netInfo.isConnected ?? true;
  const isOffline = !isOnline;

  useEffect(() => {
    if (wasOffline && isOnline) {
      // Coming back online - retry failed queries and mutations
      console.log('Network reconnected - syncing data...');

      // Retry failed queries
      queryClient.refetchQueries({
        type: 'all',
        stale: true
      });

      // Resume paused mutations
      queryClient.resumePausedMutations();

      setWasOffline(false);
    } else if (isOffline) {
      setWasOffline(true);
    }
  }, [isOnline, isOffline, wasOffline, queryClient]);

  // Pause mutations when offline
  useEffect(() => {
    if (isOffline) {
      // React Query automatically pauses mutations when networkMode is set to 'online'
      // This is already handled in our queryClient configuration
      console.log('Network disconnected - mutations will be queued');
    }
  }, [isOffline]);

  return {
    isOnline,
    isOffline,
    networkType: netInfo.type,
    isInternetReachable: netInfo.isInternetReachable,
    details: netInfo.details
  };
}

/**
 * Hook for handling background sync when app comes to foreground
 */
export function useBackgroundSync() {
  const queryClient = useQueryClient();

  const syncData = () => {
    console.log('App resumed - refreshing stale data...');

    // Refetch stale queries
    queryClient.refetchQueries({
      stale: true
    });
  };

  return { syncData };
}

/**
 * Hook for managing query cache persistence
 */
export function useCachePersistence() {
  const queryClient = useQueryClient();

  const clearCache = () => {
    queryClient.clear();
  };

  const removeQueries = (queryKey: string[]) => {
    queryClient.removeQueries({ queryKey });
  };

  const invalidateQueries = (queryKey: string[]) => {
    queryClient.invalidateQueries({ queryKey });
  };

  return {
    clearCache,
    removeQueries,
    invalidateQueries
  };
}
