export class ApiClient {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const result = await response.json();
      throw new Error(`${result?.message ?? `HTTP error. Status Code: ${response.status}`}`);
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

  private async request(
    method: string,
    endpoint: string,
    options?: RequestInit,
    body?: Record<string, unknown>,
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

    return this.handleResponse(response);
  }

  public get(endpoint: string, queryParams?: Record<string, string | number | boolean>, options?: RequestInit) {
    return this.request('GET', endpoint, options, undefined, queryParams);
  }

  public post(endpoint: string, body?: Record<string, unknown> | undefined, options?: RequestInit) {
    return this.request('POST', endpoint, options, body);
  }

  public put(endpoint: string, body?: Record<string, unknown>, options?: RequestInit) {
    return this.request('PUT', endpoint, options, body);
  }

  public delete(endpoint: string, options?: RequestInit) {
    return this.request('DELETE', endpoint, options);
  }
}
