import config from "@/config/config";
import {AccessToken} from "@/types/auth";
import {httpRequest} from "@/utils/http";
import type {paths, components} from "./v1";

export type Case = components["schemas"]["Case"];
export type Victim = Case["victim"];
export type Aggressor = Case["aggressor"];
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

export type ValidationErrors = components["responses"]["ValidationErrorResponse"]["content"]["application/json"];

const endpoints = {
  cases: () => new URL("/v1/cases", config.api.aqsnv.server),
  case: (id: string) => new URL(`/v1/cases/${id}`, config.api.aqsnv.server),
};

export type CaseValidationResult = { ok: true } | { ok: false, errors: ValidationErrors };

export async function createCase(token: AccessToken, entity: Case): Promise<CaseValidationResult> {
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

export async function updateCase(token: AccessToken, caseId: string, entity: Case): Promise<CaseValidationResult> {
  const payload = JSON.stringify(entity);
  const response = await httpRequest(endpoints.case(caseId), {
    method: "put",
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

export type CaseSummary = paths["/v1/cases/"]["get"]["responses"]["200"]["content"]["application/json"][0];
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
  return await response.json() as CaseSummary[];
}

export async function getCase(token: AccessToken, caseId: string): Promise<Case> {
  const url = new URL(endpoints.case(caseId));

  const response = await httpRequest(url, {
    method: "get",
    headers: {
      "Authorization": token.asAuthorizationHeader(),
      "Content-Type": "application/json",
    },
  });
  return await response.json() as Case;
}
