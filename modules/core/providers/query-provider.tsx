import { type PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

/**
 * React Query Provider component
 *
 * Provides the QueryClient to the entire app tree.
 * Should be placed high in the component hierarchy.
 */
export function ReactQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
