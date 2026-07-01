import {useQuery} from "react-query";
import {getCase, updateCase} from "@/api/aqsnv/cases";
import {useAccessToken} from '@/hooks/auth';
import {getRouteApi} from '@tanstack/react-router';
import {defaultFormValues, caseToFormValues, formValuesToCase} from "@/routes/cases/formValues";
import CaseForm from "@/routes/cases/components/CaseForm";
import useDocumentTitle from "@/hooks/documentTitle";

const routeApi = getRouteApi('/_authenticated/cases/$caseId/edit');

export default function CasesEdit() {
  useDocumentTitle("Editar caso");

    const {caseId} = routeApi.useParams();
    const accessToken = useAccessToken();
    const {data, isLoading} = useQuery({
        queryKey: ["case", caseId],
        queryFn: async () => {
            const record = await getCase(accessToken, caseId);
            return caseToFormValues(record);
        },
    });

    // TODO: Show loader
    if (isLoading) return <></>;

    return (
        <CaseForm
            defaultValues={isLoading || !data ? defaultFormValues : data}
            onSubmit={(value) => {
                const payload = formValuesToCase(value);
                return updateCase(accessToken, caseId, payload);
            }}
        />
    );
}
