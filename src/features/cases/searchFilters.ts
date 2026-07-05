import { ListCaseFilters, Province, CaseCategory, CaseMurderWeapon, CaseVictimBondAggressor } from '@/api/aqsnv/cases';
import { stringToOptionalEnum, YesNoUnknown, yesNoUnknownToBoolean, booleanToYesNoUnknown } from '@/utils/cast';
import dayjs, { type Dayjs } from '@/lib/dayjs';

// Form-facing shape (Dayjs dates + tri-state) used to drive the MUI inputs.
export const defaultSearchOptions = {
  fromDate: dayjs().startOf("year") as Dayjs | null,
  toDate: null as Dayjs | null,
  province: null as string | null,
  location: "",
  caseCategory: null as string | null,
  wasItAnAttempt: "unknown" as YesNoUnknown,
  murderWeapon: null as string | null,
  victimBondAggressor: null as string | null,
  victimFullName: "",
  aggressorFullName: "",
};

export type SearchOptions = typeof defaultSearchOptions;

const blankToUndefined = (value: string): string | undefined => {
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
};

// Form values -> serializable URL/API filters. Blanks and "unknown" collapse to
// undefined so they stay out of the URL.
export const searchOptionsToFilters = (options: SearchOptions): ListCaseFilters => ({
  // "" (not undefined) marks an explicitly cleared date so validateSearch won't
  // re-apply the this-year default; listCases ignores "" so the API sees no filter.
  fromDate: options.fromDate ? options.fromDate.format("YYYY-MM-DD") : "",
  toDate: options.toDate?.format("YYYY-MM-DD"),
  province: stringToOptionalEnum<Province>(options.province),
  location: blankToUndefined(options.location),
  caseCategory: stringToOptionalEnum<CaseCategory>(options.caseCategory),
  wasItAnAttempt: yesNoUnknownToBoolean(options.wasItAnAttempt),
  murderWeapon: stringToOptionalEnum<CaseMurderWeapon>(options.murderWeapon),
  victimBondAggressor: stringToOptionalEnum<CaseVictimBondAggressor>(options.victimBondAggressor),
  victimFullName: blankToUndefined(options.victimFullName),
  aggressorFullName: blankToUndefined(options.aggressorFullName),
});

// URL filters -> form values, for seeding the form from the current URL.
export const filtersToSearchOptions = (search: ListCaseFilters): SearchOptions => {
  const s: NonNullable<ListCaseFilters> = search ?? {};
  return {
    fromDate:
      s.fromDate === undefined
        ? defaultSearchOptions.fromDate // defensive; validated search is never undefined
        : s.fromDate === ""
          ? null // explicitly cleared -> empty picker
          : dayjs(s.fromDate),
    toDate: s.toDate ? dayjs(s.toDate) : null,
    province: s.province ?? null,
    location: s.location ?? "",
    caseCategory: s.caseCategory ?? null,
    wasItAnAttempt: booleanToYesNoUnknown(s.wasItAnAttempt),
    murderWeapon: s.murderWeapon ?? null,
    victimBondAggressor: s.victimBondAggressor ?? null,
    victimFullName: s.victimFullName ?? "",
    aggressorFullName: s.aggressorFullName ?? "",
  };
};

// validateSearch: coerce raw URL search into typed filters. Defaults fromDate to
// the start of the current year when absent so a bare /cases behaves as before.
export function parseCaseSearch(raw: Record<string, unknown>): ListCaseFilters {
  const str = (value: unknown): string | undefined =>
    typeof value === "string" && value !== "" ? value : undefined;
  const bool = (value: unknown): boolean | undefined =>
    typeof value === "boolean" ? value : value === "true" ? true : value === "false" ? false : undefined;

  return {
    // Absent -> default this-year; present ("" for an explicit clear, or a date) is kept.
    fromDate:
      raw.fromDate === undefined
        ? dayjs().startOf("year").format("YYYY-MM-DD")
        : str(raw.fromDate) ?? "",
    toDate: str(raw.toDate),
    province: stringToOptionalEnum<Province>(str(raw.province)),
    location: str(raw.location),
    caseCategory: stringToOptionalEnum<CaseCategory>(str(raw.caseCategory)),
    wasItAnAttempt: bool(raw.wasItAnAttempt),
    murderWeapon: stringToOptionalEnum<CaseMurderWeapon>(str(raw.murderWeapon)),
    victimBondAggressor: stringToOptionalEnum<CaseVictimBondAggressor>(str(raw.victimBondAggressor)),
    victimFullName: str(raw.victimFullName),
    aggressorFullName: str(raw.aggressorFullName),
  };
}
