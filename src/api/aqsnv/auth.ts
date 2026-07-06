import config from "@/config/config";
import { httpRequest } from "@/utils/http";

const endpoints = {
  pkce: () => new URL("/auth/pkce", config.api.aqsnv.server),
  authorize: () => new URL("/auth/authorize", config.api.aqsnv.server),
  token: () => new URL("auth/token", config.api.aqsnv.server),
};

export type PKCEPair = {
  verifier: string;
  challenge: string;
  method: string;
};

export async function generatePKCEPair(): Promise<PKCEPair> {
  const response = await httpRequest(endpoints.pkce());
  return response.json();
}

export async function buildAuthorizationUrl(
  state: string,
  pkcePair: PKCEPair,
): Promise<URL> {
  const result = endpoints.authorize();
  result.searchParams.append("client_id", config.api.aqsnv.clientId);
  result.searchParams.append("response_type", "code");
  result.searchParams.append("state", state);
  result.searchParams.append("code_challenge", pkcePair.challenge);
  result.searchParams.append("code_challenge_method", pkcePair.method);

  return result;
}

export type AccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export async function exchangeAuthorizationCode(
  authorizationCode: string,
  verifier: string,
): Promise<AccessTokenResponse> {
  const requestData = new URLSearchParams();
  requestData.append("code", authorizationCode);
  requestData.append("client_id", config.api.aqsnv.clientId);
  requestData.append("grant_type", "authorization_code");
  requestData.append("code_verifier", verifier);

  const response = await httpRequest(endpoints.token(), {
    body: requestData,
    method: "POST",
  });
  return response.json();
}
