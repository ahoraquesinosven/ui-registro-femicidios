import { defaultFormValues } from "./formValues";

function difference<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter((x) => !b.has(x)));
}

// Each set exposes the form fields displayed by a section, so CaseForm can show
// a tab-level error indicator. They live here (rather than next to each section
// component) so the section components export only their component, and so the
// case set can be derived from the others without the components importing each
// other.
export const victimControlledFields = new Set([
  "isRape",
  "hadLegalComplaints",
  "wasJudicialized",
  "totalLegalComplaints",
  "judicialMeasures",
  ...Object.getOwnPropertyNames(defaultFormValues.victim).map(
    (field) => `victim.${field}`,
  ),
]);

export const aggressorControlledFields = new Set([
  "victimBondAggressor",
  ...Object.getOwnPropertyNames(defaultFormValues.aggressor).map(
    (field) => `aggressor.${field}`,
  ),
]);

export const caseControlledFields = difference(
  new Set(Object.getOwnPropertyNames(defaultFormValues)),
  new Set([
    "victim",
    "aggressor",
    ...aggressorControlledFields,
    ...victimControlledFields,
  ]),
);
