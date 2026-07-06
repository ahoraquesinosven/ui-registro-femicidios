import { createCase } from "@/api/aqsnv/cases";
import CaseForm from "./CaseForm";
import { defaultFormValues, formValuesToCase } from "./formValues";

export default function CasesNew() {
  return (
    <CaseForm
      defaultValues={defaultFormValues}
      onSubmit={(value) => {
        const payload = formValuesToCase(value);
        return createCase(payload);
      }}
      reset
    />
  );
}
