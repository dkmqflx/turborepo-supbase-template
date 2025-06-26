export class ApiError extends Error {
  code: string;
  data: any;
  isSuccess: boolean;

  constructor({ code, message, data, isSuccess }: { code: string; message: string; data: any; isSuccess: boolean }) {
    super(message);
    this.code = code;
    this.data = data;
    this.isSuccess = isSuccess;
    this.name = 'ApiError';
  }
}
