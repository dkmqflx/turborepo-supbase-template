import {
  QueryCache,
  QueryClient,
  defaultShouldDehydrateMutation,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query';

import { toast } from '@repo/ui/sonner';
import { ApiError } from '@repo/utils/apiError';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      // NOTE: after onError callback function is called, the throwOnError will be called
      queries: {
        staleTime: 60 * 1000,
        // NOTE: Error boundary will be triggered if throwOnError return true
        throwOnError: (error) => {
          console.log(error);
          return error instanceof ApiError && error.code === 'SERVER_ERROR';
        },
      },
      mutations: {
        // NOTE: Error boundary will be triggered if throwOnError return true
        throwOnError: (error) => {
          console.log(error);
          return error instanceof ApiError && error.code === 'SERVER_ERROR';
        },
      },
      dehydrate: {
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
        shouldDehydrateMutation: (query) => defaultShouldDehydrateMutation(query) || query.state.status === 'pending',
      },
    },

    queryCache: new QueryCache({
      // NOTE: toast for query
      onSuccess: (data, query) => {
        console.log('data', data);

        if (isServer) return;

        if (query.meta?.toast) {
          toast.success(query.meta?.message as string);
        }
      },

      onError: (error, query) => {
        console.error(error);

        if (isServer) return;

        if (query.meta?.toast) {
          toast.error(query.meta?.message as string);
        }
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
