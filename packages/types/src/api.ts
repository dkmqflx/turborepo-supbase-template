export type BaseResponse<T> = {
  data: T;
  isSuccess: boolean;
  code: string;
  message: string;
};
