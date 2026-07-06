import { authToken } from "@/lib/auth";

export class HttpError extends Error {
  readonly request?: RequestInit;
  readonly response: Response;

  constructor(message: string, response: Response, request?: RequestInit) {
    super(message);
    this.name = "HttpError";
    this.request = request;
    this.response = response;
  }
}

export async function httpRequest(
  url: URL,
  options?: RequestInit,
): Promise<Response> {
  const result = await fetch(url, options);

  if (result.status >= 500) {
    throw new HttpError(
      `HTTP Request responded with ${result.status} ${result.statusText}`,
      result,
      options,
    );
  }

  return result;
}

// Same as httpRequest but attaches the current in-memory auth token as a Bearer
// header. Authenticated API wrappers call this; unauthenticated endpoints (the
// OAuth handshake in api/aqsnv/auth.ts) keep using httpRequest directly.
export async function authorizedRequest(
  url: URL,
  options: RequestInit = {},
): Promise<Response> {
  return httpRequest(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: authToken.asAuthorizationHeader(),
    },
  });
}
