import {
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Container,
  Typography,
} from "@mui/material";

type VictimFormProps = {
  formValues: {
    fullName?: string;
    age?: string;
    gender?: string;
    nationality?: string;
    isSexualWorker?: boolean;
    isMissingPerson?: boolean;
    isNativePeople?: boolean;
    isPregnant?: boolean;
    hasDisabillity?: boolean;
    occupation?: string;
    hasChildren?: boolean;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const VictimForm = ({
  formValues,
  handleInputChange,
  handleCheck,
}: VictimFormProps) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Informacion de la Victima
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

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Genero"
              name="gender"
              type="string"
              value={formValues.gender}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nacionalidad (3 Letras)"
              name="nationality"
              value={formValues.nationality}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ocupacion"
              name="occupation"
              value={formValues.occupation}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isSexualWorker"
                  checked={formValues.isSexualWorker}
                  onChange={handleCheck}
                />
              }
              label="Prostitution"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isMissingPerson"
                  checked={formValues.isMissingPerson}
                  onChange={handleCheck}
                />
              }
              label="Desaparecida"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isNativePeople"
                  checked={formValues.isNativePeople}
                  onChange={handleCheck}
                />
              }
              label="Pueblo Originario"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isPregnant"
                  checked={formValues.isPregnant}
                  onChange={handleCheck}
                />
              }
              label="Embarazada"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="hasDisabillity"
                  checked={formValues.hasDisabillity}
                  onChange={handleCheck}
                />
              }
              label="Discapacidad"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="hasChildren"
                  checked={formValues.hasChildren}
                  onChange={handleCheck}
                />
              }
              label="Hijos"
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default VictimForm;
