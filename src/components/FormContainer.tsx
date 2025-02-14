import { useState } from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import VictimForm from "./VictimForm";
import AggressorForm from "./AggressorForm";
import CaseForm from "./CaseForm";
import { Button } from '@mui/material';
import {useAccessToken} from '@/hooks/auth';

const FormContainer = () => {
    const [victimFormValues, setVictimFormValues] = useState({});
    const [aggressorFormValues, setAggressorFormValues] = useState({});
    const [caseFormValues, setCaseFormValues] = useState({});
  
    const handleVictimForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
          setVictimFormValues({
            ...victimFormValues,
            [name]: value,
          });
    };

    const handleAggressorForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
          setAggressorFormValues({
              ...aggressorFormValues,
              [name]: value,
          });
    }

    const handleCaseForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
          setCaseFormValues({
              ...caseFormValues,
              [name]: value,
          });
    }

    const accessToken = useAccessToken();
    console.log("Si, el token acces es: ", accessToken);

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {

      e.preventDefault();

      const payload = {victim: victimFormValues, aggresor: aggressorFormValues, case: caseFormValues };
          try {
            const response = await fetch('http://localhost:8080/v1/case', {
                mode: "cors",
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    'Authorization' : accessToken.asAuthorizationHeader(),
                    "Content-Type": "application/json",
                }
            });
            console.log('Success:', response);
          } catch (error) {
            console.error('Error:', error);
          }
    };
    

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} direction="column" alignItems="stretch">
          <Grid item>
            <VictimForm formValues={victimFormValues} handleInputChange={handleVictimForm}/>
          </Grid>
          <Grid item>
            <AggressorForm formValues={aggressorFormValues} handleInputChange={handleAggressorForm}/>
          </Grid>
          <Grid item>
            <CaseForm formValues={caseFormValues} handleInputChange={handleCaseForm}/>
          </Grid>
          <Grid item>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Enviar
              </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FormContainer;
