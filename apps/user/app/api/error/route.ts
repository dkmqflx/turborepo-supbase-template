import type { BaseResponse } from '@repo/types/api';

export async function GET(): Promise<Response> {
  const response: BaseResponse<null> = {
    data: null,
    isSuccess: false,
    code: 'FAILED',
    message: 'Posts fetched failed',
  };

  return Response.json(response, { status: 400 });
}
