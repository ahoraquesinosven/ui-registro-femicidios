import { useState } from "react";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import VictimForm from "./VictimForm";
import AggressorForm from "./AggressorForm";
import CaseForm from "./CaseForm";
import { useAccessToken } from "@/hooks/auth";

const steps = ["Información de la Víctima", "Información del Agresor", "Información del Caso"];

const FormContainer = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [victimFormValues, setVictimFormValues] = useState({});
    const [aggressorFormValues, setAggressorFormValues] = useState({});
    const [caseFormValues, setCaseFormValues] = useState({});
    const [checkBoxValue, setCheckBoxValue] = useState(false);

    const handleVictimForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVictimFormValues({
            ...victimFormValues,
            [name]: value,
        });
    };

    const handleAggressorForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAggressorFormValues({
            ...aggressorFormValues,
            [name]: value,
        });
    };

    const handleCaseForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCaseFormValues({
            ...caseFormValues,
            [name]: value,
        });
    };

    const handleVictimCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCheckBoxValue(value == "on");
        setVictimFormValues({
            ...victimFormValues,
            [name]: checkBoxValue,
        });
    };

    const handleAggressorCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCheckBoxValue(value == "on");
        setAggressorFormValues({
            ...aggressorFormValues,
            [name]: checkBoxValue,
        });
    };

    const handleCaseCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCheckBoxValue(value == "on");
        setCaseFormValues({
            ...caseFormValues,
            [name]: checkBoxValue,
        });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const accessToken = useAccessToken();

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            ...caseFormValues,
            victim: victimFormValues,
            aggressor: aggressorFormValues,
        };
        try {
            const response = await fetch("http://localhost:8080/v1/cases/", {
                mode: "cors",
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    'Authorization': accessToken.asAuthorizationHeader(),
                    "Content-Type": "application/json",
                },
            });
            console.log("Success:", response);
        } catch (error) {
            console.error("Error:", error);
        }
    };

 const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <VictimForm
            formValues={victimFormValues}
            handleInputChange={handleVictimForm}
            handleCheck={handleVictimCheck}
          />
        );
      case 1:
        return (
          <AggressorForm
            formValues={aggressorFormValues}
            handleInputChange={handleAggressorForm}
            handleCheck={handleAggressorCheck}
          />
        );
      case 2:
        return (
          <CaseForm
            formValues={caseFormValues}
            handleInputChange={handleCaseForm}
            handleCheck={handleCaseCheck}
          />
        );
      default:
        return "Unknown step";
    }
  };

    return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <>
          <Box sx={{ mb: 2 }}>
             {getStepContent(activeStep)}
          </Box>


          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button type="submit" variant="contained" color="primary">
                Enviar Datos
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Siguiente
              </Button>
            )}
          </Box>
        </>
      </form>
    </Container>
  );

};

export default FormContainer;
