import {createCase} from "@/api/aqsnv/cases";
import {defaultFormValues, formValuesToCase} from "@/routes/cases/formValues";
import CaseForm from "@/routes/cases/components/CaseForm";
import { useAccessToken } from "@/hooks/auth";
import useDocumentTitle from "@/hooks/documentTitle";

export default function CasesNew() {
    useDocumentTitle("Nuevo Caso");
    const accessToken = useAccessToken();

    return (
        <CaseForm 
            defaultValues={defaultFormValues}
            onSubmit={(value) => {
                const payload = formValuesToCase(value);
                return createCase(accessToken, payload);
            }}
            reset
        />
    );
}
