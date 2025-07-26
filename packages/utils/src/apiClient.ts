import { BaseResponse } from '@repo/types/api';

import { ApiError } from './apiError';

export class ApiClient {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  private async handleResponse<T>(response: Response): Promise<BaseResponse<T>> {
    if (!response.ok) {
      const result = await response.json();

      console.log('result', result);

      throw new ApiError({
        code: result?.code,
        message: result?.message,
        data: result?.data,
        isSuccess: result?.isSuccess,
      });
    }

    try {
      const result = await response.json();

      return result;
    } catch (error) {
      console.warn('Error parsing JSON response:', error);
      throw new Error('Error parsing JSON response');
    }
  }

  private buildUrl(endpoint: string, queryParams?: Record<string, string | number | boolean>): string {
    const url = new URL(endpoint, this.baseUrl);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    return url.toString();
  }

  private async request<T, TBody = Record<string, unknown>>(
    method: string,
    endpoint: string,
    options?: RequestInit,
    body?: TBody,
    queryParams?: Record<string, string | number | boolean>,
  ) {
    const url = this.buildUrl(endpoint, queryParams);

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  public get<T>(endpoint: string, queryParams?: Record<string, string | number | boolean>, options?: RequestInit) {
    return this.request<T>('GET', endpoint, options, undefined, queryParams);
  }

  public post<T, TBody = Record<string, unknown>>(endpoint: string, body?: TBody, options?: RequestInit) {
    return this.request<T, TBody>('POST', endpoint, options, body);
  }

  public put<T, TBody = Record<string, unknown>>(endpoint: string, body?: TBody, options?: RequestInit) {
    return this.request<T, TBody>('PUT', endpoint, options, body);
  }

  public delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>('DELETE', endpoint, options);
  }
}
