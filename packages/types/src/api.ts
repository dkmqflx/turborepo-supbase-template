export type BaseResponse<T> = {
  data: T | null;
  error: string | null;
  message?: string;
  status: number;
};
