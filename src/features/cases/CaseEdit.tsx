import { useQuery } from "@tanstack/react-query";
import { getCase, updateCase } from "@/api/aqsnv/cases";
import CaseForm from "./CaseForm";
import {
  caseToFormValues,
  defaultFormValues,
  formValuesToCase,
} from "./formValues";

export default function CasesEdit({ caseId }: { caseId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["case", caseId],
    queryFn: async () => {
      const record = await getCase(caseId);
      return caseToFormValues(record);
    },
  });

  // TODO: Show loader
  if (isLoading) return null;

  return (
    <CaseForm
      defaultValues={isLoading || !data ? defaultFormValues : data}
      onSubmit={(value) => {
        const payload = formValuesToCase(value);
        return updateCase(caseId, payload);
      }}
    />
  );
}
