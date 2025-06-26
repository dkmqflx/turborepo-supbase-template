import { client } from '@/shared/lib/apiClient';

import type { Post } from './types';

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await client.get('/api/posts');

  return data;
};
