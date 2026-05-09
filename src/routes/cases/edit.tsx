import {useQuery} from "react-query";
import {getCase, updateCase} from "@/api/aqsnv/cases";
import {useAccessToken} from '@/hooks/auth';
import {useParams} from 'react-router-dom';
import {defaultFormValues, caseToFormValues, formValuesToCase} from "@/routes/cases/formValues";
import CaseForm from "@/routes/cases/components/CaseForm";

function useParamCaseId() {
    const {caseId} = useParams();
    if (!caseId) {
        throw new Error("Invalid state, edit case without case id");
    }

    return caseId;
}

export default function CasesEdit() {
    const caseId = useParamCaseId();
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
