import { renderHook, act } from '@testing-library/react-native';
import { useOfflineSupport, useBackgroundSync, useCachePersistence } from '@/modules/core/hooks/use-offline';

// Mock NetInfo
const mockNetInfo = {
  isConnected: true,
  isInternetReachable: true,
  type: 'wifi',
  details: {}
};

jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: jest.fn(() => mockNetInfo)
}));

// Mock React Query
const mockQueryClient = {
  refetchQueries: jest.fn(),
  resumePausedMutations: jest.fn(),
  clear: jest.fn(),
  removeQueries: jest.fn(),
  invalidateQueries: jest.fn()
};

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(() => mockQueryClient)
}));

describe('useOfflineSupport', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNetInfo.isConnected = true;
    mockNetInfo.isInternetReachable = true;
  });

  it('should return online status when connected', () => {
    const { result } = renderHook(() => useOfflineSupport());

    expect(result.current.isOnline).toBe(true);
    expect(result.current.isOffline).toBe(false);
    expect(result.current.networkType).toBe('wifi');
  });

  it('should return offline status when disconnected', () => {
    mockNetInfo.isConnected = false;
    
    const { result } = renderHook(() => useOfflineSupport());

    expect(result.current.isOnline).toBe(false);
    expect(result.current.isOffline).toBe(true);
  });

  it('should sync data when coming back online', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    mockNetInfo.isConnected = false;
    const { result, rerender } = renderHook(() => useOfflineSupport());
    
    expect(result.current.isOffline).toBe(true);
    
    act(() => {
      mockNetInfo.isConnected = true;
      rerender({});
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Network reconnected - syncing data...');
    expect(mockQueryClient.refetchQueries).toHaveBeenCalledWith({
      type: 'all',
      stale: true
    });
    expect(mockQueryClient.resumePausedMutations).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should log when going offline', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    mockNetInfo.isConnected = true;
    const { rerender } = renderHook(() => useOfflineSupport());
    
    act(() => {
      mockNetInfo.isConnected = false;
      rerender({});
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Network disconnected - mutations will be queued');
    consoleSpy.mockRestore();
  });

  it('should expose network details', () => {
    mockNetInfo.isInternetReachable = false;
    mockNetInfo.details = { ssid: 'TestNetwork' };
    
    const { result } = renderHook(() => useOfflineSupport());
    
    expect(result.current.isInternetReachable).toBe(false);
    expect(result.current.details).toEqual({ ssid: 'TestNetwork' });
  });
});

describe('useBackgroundSync', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide syncData function', () => {
    const { result } = renderHook(() => useBackgroundSync());
    
    expect(result.current.syncData).toBeDefined();
    expect(typeof result.current.syncData).toBe('function');
  });

  it('should refetch stale queries when syncing', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const { result } = renderHook(() => useBackgroundSync());
    
    act(() => {
      result.current.syncData();
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('App resumed - refreshing stale data...');
    expect(mockQueryClient.refetchQueries).toHaveBeenCalledWith({
      stale: true
    });
    
    consoleSpy.mockRestore();
  });
});

describe('useCachePersistence', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide cache management functions', () => {
    const { result } = renderHook(() => useCachePersistence());
    
    expect(result.current.clearCache).toBeDefined();
    expect(result.current.removeQueries).toBeDefined();
    expect(result.current.invalidateQueries).toBeDefined();
  });

  it('should clear entire cache', () => {
    const { result } = renderHook(() => useCachePersistence());
    
    act(() => {
      result.current.clearCache();
    });
    
    expect(mockQueryClient.clear).toHaveBeenCalled();
  });

  it('should remove specific queries', () => {
    const { result } = renderHook(() => useCachePersistence());
    const queryKey = ['appointments', 'list'];
    
    act(() => {
      result.current.removeQueries(queryKey);
    });
    
    expect(mockQueryClient.removeQueries).toHaveBeenCalledWith({ queryKey });
  });

  it('should invalidate specific queries', () => {
    const { result } = renderHook(() => useCachePersistence());
    const queryKey = ['clients', 'detail', '123'];
    
    act(() => {
      result.current.invalidateQueries(queryKey);
    });
    
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey });
  });
});
