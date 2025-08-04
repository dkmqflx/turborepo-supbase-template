import { client } from '@/shared/lib/apiClient';

import type { Post } from './types';

export const getPosts = async () => {
  const { data } = await client.get<Post[]>('/api/posts');

  return data;
};
