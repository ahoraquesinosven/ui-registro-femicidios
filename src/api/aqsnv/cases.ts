import config from "@/config/config";
import {httpRequest} from "@/utils/http";
import {AccessToken} from "@/types/auth";

const endpoints = {
  cases: () => new URL("/v1/cases", config.api.aqsnv.server),
};

export async function createCase(token: AccessToken, case: any) {
  const payload = JSON.stringify(case);

  const response = await httpRequest(endpoints.cases(), {
    method: 'post',
    headers: {
      "Authorization": token.asAuthorizationHeader(),
      "Content-Type": "application/json",
    },
    body: payload,
  });

  return response.json();
}

