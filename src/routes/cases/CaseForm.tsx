import { TextField, Checkbox, FormControlLabel, Grid, Container, Typography } from '@mui/material';

type CaseFormProps = {
  formValues: {
    victim_id?: string,
    aggresor_id?: string,
    occurredAt?: string,
    momentOfDay?: string,
    province?: string,
    location?: string,
    geographicLocation?: string,
    place?: string,
    murderWeapon?: string,
    wasJudicialized?: boolean,
    hadLegalComplaints?: boolean,
    isRape?: boolean,
    isRelatedToOrganizedCrime?: boolean,
    organizedCrimeNotes?: string,
    generalNotes?: string,
    newsLinks?: string,
  },
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CaseForm  = ( { formValues, handleInputChange, handleCheck }: CaseFormProps ) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Informacion de caso
      </Typography>
      <form >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ID Victima"
              name="victim_id"
              value={formValues.victim_id}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ID Agresor"
              name="aggresor_id"
              value={formValues.aggresor_id}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha Caso"
              name="occurredAt"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formValues.occurredAt}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Momento del dia"
              name="momentOfDay"
              value={formValues.momentOfDay}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Provincia"
              name="province"
              value={formValues.province}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Localidad"
              name="location"
              value={formValues.location}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ubicacion Geografica"
              name="geographicLocation"
              value={formValues.geographicLocation}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Lugar"
              name="place"
              value={formValues.place}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Arma"
              name="murderWeapon"
              value={formValues.murderWeapon}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="wasJudicialized"
                  checked={formValues.wasJudicialized}
                  onChange={handleCheck}
                />
              }
              label="Judicializado"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="hadLegalComplaints"
                  checked={formValues.hadLegalComplaints}
                  onChange={handleCheck}
                />
              }
              label="Esta Denunciado"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isRape"
                  checked={formValues.isRape}
                  onChange={handleCheck}
                />
              }
              label="Violacion"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isRelatedToOrganizedCrime"
                  checked={formValues.isRelatedToOrganizedCrime}
                  onChange={handleCheck}
                />
              }
              label="Crimen Organizado"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notas Crimen Organizado"
              name="organizedCrimeNotes"
              value={formValues.organizedCrimeNotes}
              onChange={handleInputChange}
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notas del caso"
              name="generalNotes"
              value={formValues.generalNotes}
              onChange={handleInputChange}
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Links relacionados"
              name="newsLinks"
              value={formValues.newsLinks}
              onChange={handleInputChange}
              variant="outlined"
              multiline
            />
          </Grid>

        </Grid>
      </form>
    </Container>
  );
};

export default CaseForm;
