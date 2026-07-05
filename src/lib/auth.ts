import { AccessToken } from "@/types/auth";

// App-wide, in-memory auth token. Deliberately a plain module singleton, not React
// state: it is read synchronously by the router's beforeLoad guard and by the HTTP
// layer, and nothing needs to re-render when it changes (authenticated views mount
// only after the post-login redirect). Lost on reload, as required.
export const authToken = new AccessToken();

export function login(rawToken: string): void {
  authToken.accessToken = rawToken;
}
