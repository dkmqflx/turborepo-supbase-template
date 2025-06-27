import type { BaseResponse } from '@repo/types/api';

export async function GET(): Promise<Response> {
  const response: BaseResponse<null> = {
    data: null,
    isSuccess: false,
    code: 'SERVER_ERROR',
    message: 'Posts fetched failed',
  };

  return Response.json(response, { status: 500 });
}

export async function POST(): Promise<Response> {
  const response: BaseResponse<null> = {
    data: null,
    isSuccess: false,
    code: 'SERVER_ERROR',
    message: 'Posts fetched failed',
  };

  return Response.json(response, { status: 500 });
}
