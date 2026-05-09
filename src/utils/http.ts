export class HttpError extends Error {
  readonly request?: RequestInit;
  readonly response: Response;

  constructor(message: string, response: Response, request?:RequestInit) {
    super(message);
    this.name = "HttpError";
    this.request = request;
    this.response = response;
  }
}

export async function httpRequest(url: URL, options?: RequestInit) : Promise<Response> {
  const result = await fetch(url, options);

  if (result.status >= 500) {
    throw new HttpError(`HTTP Request responded with ${result.status} ${result.statusText}`, result, options);
  }

  return result;
}
