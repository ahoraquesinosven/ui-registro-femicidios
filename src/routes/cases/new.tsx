import { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppForm } from "@/hooks/form";
import formDefaultValues from "./formValues";
import VictimFields from "./components/VictimFields";
import AggressorFields from "./components/AggressorFields";
import CaseFields from "./components/CaseFields";
import { formValuesToCase } from "./formValues";
import { createCase } from "@/api/aqsnv/cases";
import {useAccessToken} from '@/hooks/auth';
import TabbedSections from "@/components/TabbedSections";

export default function CasesNew() {
    const [currentNotification, setCurrentNotification] = useState({
        active: false,
        message: "",
    });
    const handleCloseNotification = () => {
        setCurrentNotification({
            active: false,
            message: "",
        });
    }

    const accessToken = useAccessToken();
    const form = useAppForm({
        defaultValues: formDefaultValues,
        onSubmit: async ({value, formApi}) => {
            const payload = formValuesToCase(value);
            const result = await createCase(accessToken, payload);

            if (result.ok) {
                setCurrentNotification({
                    active: true,
                    message: "El caso fue guardado exitosamente",
                });
                return formApi.reset();
            }

            result.errors.forEach((error) => {
                const path = error.path.split("/").slice(1).join(".") as keyof typeof formDefaultValues;
                const fieldInfo = formApi.fieldInfo[path];
                if (fieldInfo) {
                    formApi.fieldInfo[path].instance?.setErrorMap({onSubmit: error.message});
                }
            });
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    }

    return (
        <Container maxWidth="md">
            <form onSubmit={handleSubmit} noValidate>
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
                            { isSubmitting ? "Guardando" : "Guardar" }
                        </Button>
                    )}
                />
            </form>
            <Snackbar open={currentNotification.active} onClose={handleCloseNotification} autoHideDuration={5000}>
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={handleCloseNotification}>
                    {currentNotification.message}
                </Alert>

            </Snackbar>
        </Container>
    );
}
