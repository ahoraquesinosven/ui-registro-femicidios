import { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useAppForm } from "@/hooks/form";
import formDefaultValues from "./formValues";
import VictimFields from "./components/VictimFields";
import AggressorFields from "./components/AggressorFields";
import CaseFields from "./components/CaseFields";
import { formValuesToCase } from "./formValues";
import { createCase } from "@/api/aqsnv/cases";
import {useAccessToken} from '@/hooks/auth';

function tabStyles(index: number, currentTab: number) {
    return { 
        display: index === currentTab ? "block" : "none",
        py: 2,
    };
}

export default function CasesNew() {
    const [currentTab, setCurrentTab] = useState(0);

    const handleChangeCurrentTab = (_event: unknown, newTab: number) => {
        setCurrentTab(newTab);
    }

    const accessToken = useAccessToken();

    const form = useAppForm({
        defaultValues: formDefaultValues,
        onSubmit: async ({value, formApi}) => {
            const payload = formValuesToCase(value);
            console.log(payload);
            const result = await createCase(accessToken, payload);

            if (result.ok) {
                alert("Caso creado");
                return form.reset();
            }

            result.errors.forEach((error) => {
                const path = error.path.split("/").slice(1).join(".") as keyof typeof formDefaultValues;
                console.log(`Setting up error on field ${path}`)
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
            <form onSubmit={handleSubmit}>
                <Tabs variant="fullWidth" centered value={currentTab} onChange={handleChangeCurrentTab}>
                    <Tab label="Información del Caso" />
                    <Tab label="Víctima" />
                    <Tab label="Agresor" />
                </Tabs>

                <Box sx={tabStyles(0, currentTab)}>
                    <CaseFields form={form} />
                </Box>

                <Box sx={tabStyles(1, currentTab)}>
                    <VictimFields form={form} />
                </Box>

                <Box sx={tabStyles(2, currentTab)}>
                    <AggressorFields form={form} />
                </Box>


                <Button type="submit" variant="contained" color="primary">
                    Enviar Datos
                </Button>
            </form>
        </Container>
    );
}
