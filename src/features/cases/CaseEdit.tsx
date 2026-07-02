import {useQuery} from "react-query";
import {getCase, updateCase} from "@/api/aqsnv/cases";
import {getRouteApi} from '@tanstack/react-router';
import {defaultFormValues, caseToFormValues, formValuesToCase} from "./formValues";
import CaseForm from "./CaseForm";

const routeApi = getRouteApi('/_authenticated/cases/$caseId/edit');

export default function CasesEdit() {
    const {caseId} = routeApi.useParams();
    const {data, isLoading} = useQuery({
        queryKey: ["case", caseId],
        queryFn: async () => {
            const record = await getCase(caseId);
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
                return updateCase(caseId, payload);
            }}
        />
    );
}
