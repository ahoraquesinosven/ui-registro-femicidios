import { TextField, Checkbox, FormControlLabel, Grid, Container, Typography } from '@mui/material';

type AggressorFormProps = {
  formValues: {
    fullName?: string,
    age?: string,
    gender?: string,
    hasLegalComplaintHistory?: boolean,
    hasPreviousCases?: boolean,
    wasInPrison?: boolean,
    behaviourPostCase?: boolean,
  },
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AggressorForm = ( { formValues, handleInputChange, handleCheck }: AggressorFormProps ) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
      Informacion de Victimario
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre y Apellido"
              name="fullName"
              value={formValues.fullName}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Edad"
              name="age"
              type="number"
              value={formValues.age}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Genero"
              name="gender"
              value={formValues.gender}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Coportamiento post caso"
              name="behaviourPostCase"
              type="text"
              value={formValues.behaviourPostCase}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="hasLegalComplaintHistory"
                  checked={formValues.hasLegalComplaintHistory}
                  onChange={handleCheck}
                />
              }
              label="Historial legal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="hasPreviousCases"
                  checked={formValues.hasPreviousCases}
                  onChange={handleCheck}
                />
              }
              label="Tiene casos previos"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="wasInPrison"
                  checked={formValues.wasInPrison}
                  onChange={handleCheck}
                />
              }
              label="Estuvo preso"
            />
          </Grid>

        </Grid>
      </form>
    </Container>
  );
};

export default AggressorForm;
