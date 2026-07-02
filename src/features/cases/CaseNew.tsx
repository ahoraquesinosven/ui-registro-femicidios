import {createCase} from "@/api/aqsnv/cases";
import {defaultFormValues, formValuesToCase} from "./formValues";
import CaseForm from "./CaseForm";

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
