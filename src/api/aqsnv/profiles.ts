import config from "@/config/config";
import { authorizedRequest } from "@/utils/http";

const endpoints = {
  me: () => new URL("/v1/profiles/me", config.api.aqsnv.server),
};

export type User = {
  name: string;
  pictureUrl: string;
};

export async function fetchCurrentUser(): Promise<User> {
  const response = await authorizedRequest(endpoints.me());
  return response.json();
}
