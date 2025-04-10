import { apiClientInstance } from '@/shared/lib/apiClient';

import type { Post } from './types';

export const getPosts = async () => {
  const { data } = await apiClientInstance.get<Post[]>('/api/posts');

  return data;
};
