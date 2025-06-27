import { useSuspenseQuery } from '@tanstack/react-query';

import { getPosts } from './endpoints';

export const useGetPosts = () => {
  return useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });
};
