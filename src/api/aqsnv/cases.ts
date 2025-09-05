import config from "@/config/config";
import {AccessToken} from "@/types/auth";
import {httpRequest} from "@/utils/http";
import type {paths} from "./v1";

export type Case = paths["/v1/cases/"]["post"]["requestBody"]["content"]["application/json"];
export { 
  Gender,
  Nationality,
  CaseCategory,
  Province,
  CaseGeographicLocation,
  CasePlace,
  CaseMurderWeapon,
  CaseJudicialMeasure,
  CaseVictimBondAggressor,
  CaseAggressorBehaviorPostCase as AggressorBehaviorPostCase,
  CaseAggressorSecurityForce as AggressorSecurityForce,
  CaseMomentOfDay,
} from "./v1";

const endpoints = {
  cases: () => new URL("/v1/cases", config.api.aqsnv.server),
};

export async function createCase(token: AccessToken, entity: Case) {
  const payload = JSON.stringify(entity);

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
