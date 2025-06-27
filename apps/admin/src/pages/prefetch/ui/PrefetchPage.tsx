import React from 'react';

import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/lib/getQueryCient';

import { getPosts } from '../api/endpoints';
import { Posts } from './Posts';

export const PrefetchPage = () => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-4 p-4">
        <Posts />
      </div>
    </HydrationBoundary>
  );
};
