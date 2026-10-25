import { CaseStats } from '@/api/aqsnv/cases';
import { allCaseCategories } from '@/features/cases/formValues';

export type CountRow = {
  label: string | null,
  count: number,
};

export type CategoryAttemptRow = {
  caseCategory: string,
  completed: number,
  attempt: number,
  total: number,
};

export const NO_DATA_LABEL = "Sin dato";

export function formatPercent(count: number, total: number): string {
  return total === 0 ? "-" : `${(count / total * 100).toFixed(1)}%`;
}

// Fixed Sí / No / Sin dato order for the tri-state counters.
export function yesNoUnknownRows(counts: CaseStats["victimIsPregnant"]): CountRow[] {
  return [
    { label: "Sí", count: counts.yes },
    { label: "No", count: counts.no },
    { label: NO_DATA_LABEL, count: counts.unknown },
  ];
}

// Pivots the (category, attempt) pairs into one row per category, keeping every
// category (zeros included) in enum order so the table shape stays stable.
export function categoryAttemptRows(byCategoryAndAttempt: CaseStats["byCategoryAndAttempt"]): CategoryAttemptRow[] {
  return allCaseCategories.map((caseCategory) => {
    const countFor = (wasItAnAttempt: boolean) =>
      byCategoryAndAttempt.find((item) => item.caseCategory === caseCategory && item.wasItAnAttempt === wasItAnAttempt)?.count ?? 0;
    const completed = countFor(false);
    const attempt = countFor(true);
    return { caseCategory, completed, attempt, total: completed + attempt };
  });
}
