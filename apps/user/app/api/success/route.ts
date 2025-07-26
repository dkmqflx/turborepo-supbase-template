import { BaseResponse } from '@repo/types/api';

export async function POST(): Promise<Response> {
  const response: BaseResponse<null> = {
    data: null,
    isSuccess: true,
    code: 'SUCCESS',
    message: 'Posts fetched successfully',
  };

  return Response.json(response, { status: 200 });
}

export async function GET(): Promise<Response> {
  const response: BaseResponse<null> = {
    data: null,
    isSuccess: true,
    code: 'SUCCESS',
    message: 'Posts fetched successfully',
  };

  return Response.json(response, { status: 200 });
}
