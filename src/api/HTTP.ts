enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

interface ObjectLike {
  [key: string]: string | number | ObjectLike;
}

interface Options {
  method?: Method;
  data?: FormData | ObjectLike;
  headers?: HeadersInit;
  timeout?: number;
  raw?: boolean;
}

const defaultMethod = Method.GET;

export default class HTTP {
  protected endpoint: string;

  constructor(endpoint: string, baseUrl: string) {
    this.endpoint = `${baseUrl}${endpoint}`;
  }

  public get<Response>(path = '/', options: Options = {}): Promise<Response> {
    return HTTP.request(this.endpoint + path, { ...options, method: Method.GET });
  }

  public post<Response>(path = '/', options: Options = {}): Promise<Response> {
    return HTTP.request(this.endpoint + path, { ...options, method: Method.POST });
  }

  public put<Response>(path = '/', options: Options = {}): Promise<Response> {
    return HTTP.request(this.endpoint + path, { ...options, method: Method.PUT });
  }

  public delete<Response>(path = '/', options: Options = {}): Promise<Response> {
    return HTTP.request(this.endpoint + path, { ...options, method: Method.DELETE });
  }

  private static async request<Response>(url: string, options: Options): Promise<Response> {
    const {
      method = defaultMethod,
      data,
      headers = {
        'content-type': 'application/json; charset=utf-8'
      },
      raw = false
    } = options;

    const body = raw ? (data as FormData) : JSON.stringify(data);

    const response = await fetch(url, { headers, method, body, credentials: 'include' });

    const contentType = response.headers.get('content-type');
    const isJson = contentType.includes('application/json');
    const parsedResponse = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      throw new Error(JSON.stringify(parsedResponse));
    }

    return parsedResponse as Response;
  }
}
