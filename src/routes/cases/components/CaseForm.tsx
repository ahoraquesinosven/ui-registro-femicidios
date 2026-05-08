import NotificationSnackBar, {useNotifications} from "@/components/NotificationSnackBar";
import TabbedSections from "@/components/TabbedSections";
import {handleFormSubmit, setErrorMapFromValidationResponse, useAppForm} from "@/hooks/form";
import AggressorFields from "@/routes/cases/components/AggressorFields";
import CaseFields from "@/routes/cases/components/CaseFields";
import VictimFields from "@/routes/cases/components/VictimFields";
import {defaultFormValues} from "@/routes/cases/formValues";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {CaseValidationResult} from "@/api/aqsnv/cases";

export type CaseFormProps = {
    defaultValues: typeof defaultFormValues,
    onSubmit: (value: typeof defaultFormValues) => Promise<CaseValidationResult>,
    reset?: boolean,
};

export default function CaseForm({defaultValues, onSubmit, reset}: CaseFormProps) {
    const notification = useNotifications();

    const form = useAppForm({
        defaultValues: defaultValues,
        onSubmit: async ({value, formApi}) => {
            const result = await onSubmit(value);

            if (!result.ok) {
                setErrorMapFromValidationResponse(result.errors, formApi);
                return;
            }

            notification.show("El caso fue guardado exitosamente");

            if (reset) {
                formApi.reset();
            }
        },
    });

    return (
        <Container maxWidth="md">
            <form onSubmit={handleFormSubmit(form)} noValidate>
                <TabbedSections
                    tabProps={{
                        variant: "fullWidth",
                        centered: true,
                    }}
                    boxProps={{
                        py: 2,
                    }}
                    sections={[
                        {
                            key: "case",
                            label: "Información del Caso",
                            component: <CaseFields form={form} />
                        },
                        {
                            key: "victim",
                            label: "Víctima",
                            component: <VictimFields form={form} />
                        },
                        {
                            key: "aggressor",
                            label: "Agresor",
                            component: <AggressorFields form={form} />
                        },
                    ]}
                />

                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button type="submit" variant="contained" color="primary" disabled={!canSubmit}>
                            {isSubmitting ? "Guardando" : "Guardar"}
                        </Button>
                    )}
                />
            </form>
            <NotificationSnackBar currentNotification={notification.current} closeNotification={notification.close} />
        </Container>
    );

}
