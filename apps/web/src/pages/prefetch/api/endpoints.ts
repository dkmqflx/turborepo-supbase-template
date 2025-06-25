import { apiClientInstance } from '@/shared/lib/apiClient';

import type { Post } from './types';

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await apiClientInstance.get('/api/posts');

  return data;
};
