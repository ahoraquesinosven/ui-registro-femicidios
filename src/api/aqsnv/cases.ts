import config from "@/config/config";
import {AccessToken} from "@/types/auth";
import {httpRequest} from "@/utils/http";
import type {paths} from "./v1";

export type Case = paths["/v1/cases/"]["post"]["requestBody"]["content"]["application/json"];
export type CaseSummary = paths["/v1/cases/"]["get"]["responses"]["200"]["content"]["application/json"][0];
export type ValidationErrors = paths["/v1/cases/"]["post"]["responses"]["422"]["content"]["application/json"];

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

export type CreateCaseSuccess = {
  ok: true,
}

export type CreateCaseValidationError = {
  ok: false,
  errors: ValidationErrors,
}

export type CreateCaseResult = CreateCaseSuccess | CreateCaseValidationError;

export async function createCase(token: AccessToken, entity: Case): Promise<CreateCaseResult> {
  const payload = JSON.stringify(entity);
  const response = await httpRequest(endpoints.cases(), {
    method: 'post',
    headers: {
      "Authorization": token.asAuthorizationHeader(),
      "Content-Type": "application/json",
    },
    body: payload,
  });

  if (response.ok) {
    return {
      ok: true,
    };
  }

  const validationErrors = await response.json();

  return {
    ok: false,
    errors: validationErrors as ValidationErrors,
  };
}

export type ListCaseFilters = paths["/v1/cases/"]["get"]["parameters"]["query"];

export async function listCases(token: AccessToken, filters: ListCaseFilters): Promise<CaseSummary[]> {
  const url = new URL(endpoints.cases());
  if (filters) {
    Object.entries(filters).forEach(([property, value]) => {
      if (value) {
        url.searchParams.append(property, value);
      }
    })
  }

  const response = await httpRequest(url, {
    method: 'get',
    headers: {
      "Authorization": token.asAuthorizationHeader(),
      "Content-Type": "application/json",
    },
  });
  return await response.json() as CaseSummary[]
}
