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

    const form = useAppForm({
        defaultValues: formDefaultValues,
        onSubmit: async (submission) => {
            console.log("Form value", submission.value);
            const payload = formValuesToCase(submission.value);
            console.log("Payload", payload);
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
