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
        onSubmit: async ({ value } : { value: unknown }) => {
            console.log(value);
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
                    <Tab label="Víctima" />
                    <Tab label="Agresor" />
                    <Tab label="Información del Caso" />
                </Tabs>

                <Box sx={tabStyles(0, currentTab)}>
                    <VictimFields form={form} />
                </Box>

                <Box sx={tabStyles(1, currentTab)}>
                    <AggressorFields form={form} />
                </Box>

                <Box sx={tabStyles(2, currentTab)}>
                    <CaseFields form={form} />
                </Box>

                <Button type="submit" variant="contained" color="primary">
                    Enviar Datos
                </Button>
            </form>
        </Container>
    );
}
