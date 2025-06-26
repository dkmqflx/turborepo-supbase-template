import type { BaseResponse } from '@repo/types/api';

import { mockPosts } from '@/pages/prefetch/api/mock';
import type { Post } from '@/pages/prefetch/api/types';

export async function GET(): Promise<Response> {
  const response: BaseResponse<Post[]> = {
    data: mockPosts,
    isSuccess: true,
    code: 'SUCCESS',
    message: 'Posts fetched successfully',
  };

  return Response.json(response);
}
