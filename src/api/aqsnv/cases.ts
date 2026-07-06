import config from "@/config/config";
import { authorizedRequest } from "@/utils/http";
import type { components, paths } from "./v1";

export type Case = components["schemas"]["Case"];
export type Victim = Case["victim"];
export type Aggressor = Case["aggressor"];
export {
  CaseAggressorBehaviorPostCase as AggressorBehaviorPostCase,
  CaseAggressorSecurityForce as AggressorSecurityForce,
  CaseCategory,
  CaseGeographicLocation,
  CaseJudicialMeasure,
  CaseMomentOfDay,
  CaseMurderWeapon,
  CasePlace,
  CaseVictimBondAggressor,
  Gender,
  Nationality,
  Province,
} from "./v1";

export type ValidationErrors =
  components["responses"]["ValidationErrorResponse"]["content"]["application/json"];

const endpoints = {
  cases: () => new URL("/v1/cases", config.api.aqsnv.server),
  case: (id: string) => new URL(`/v1/cases/${id}`, config.api.aqsnv.server),
};

export type CaseValidationResult =
  | { ok: true }
  | { ok: false; errors: ValidationErrors };

export async function createCase(entity: Case): Promise<CaseValidationResult> {
  const payload = JSON.stringify(entity);
  const response = await authorizedRequest(endpoints.cases(), {
    method: "post",
    headers: {
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

export async function updateCase(
  caseId: string,
  entity: Case,
): Promise<CaseValidationResult> {
  const payload = JSON.stringify(entity);
  const response = await authorizedRequest(endpoints.case(caseId), {
    method: "put",
    headers: {
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

export type CaseListItem = components["schemas"]["CaseListItem"];
export type CaseListPage = components["schemas"]["CaseListPage"];
export type ListCaseFilters = paths["/v1/cases"]["get"]["parameters"]["query"];

export async function listCases(
  filters: ListCaseFilters,
  limit?: number,
  start?: string,
): Promise<CaseListPage> {
  const url = new URL(endpoints.cases());
  if (filters) {
    Object.entries(filters).forEach(([property, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        url.searchParams.append(property, value.toString());
      }
    });
  }
  if (limit) {
    url.searchParams.append("limit", limit.toString());
  }
  if (start) {
    url.searchParams.append("start", start);
  }

  const response = await authorizedRequest(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await response.json()) as CaseListPage;
}

export async function getCase(caseId: string): Promise<Case> {
  const url = new URL(endpoints.case(caseId));

  const response = await authorizedRequest(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await response.json()) as Case;
}
