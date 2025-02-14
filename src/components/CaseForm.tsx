import { TextField, Checkbox, FormControlLabel, Grid, Container, Typography } from '@mui/material';

type CaseFormProps = {
  formValues: {
    victim_id?: string,
    aggresor_id?: string,
    case_creation?: string,
    last_update?: string,
    incident_date?: string,
    case_day_moment?: string,
    case_type?: string,
    case_gender?: string,
    case_province?: string,
    case_location?: string,
    case_geographic_ubication?: string,
    case_place?: string,
    case_form?: string,
    case_justice?: boolean,
    case_legal_complaints?: string,
    case_rape?: boolean,
    case_organized_crime?: boolean,
    case_organized_crime_notes?: string,
    case_notes?: string,
    case_news_links?: string,
  },
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

const CaseForm  = ( { formValues, handleInputChange }: CaseFormProps ) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Case Information Form
      </Typography>
      <form >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Victim ID"
              name="victim_id"
              value={formValues.victim_id}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Aggressor ID"
              name="aggresor_id"
              value={formValues.aggresor_id}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Case Creation Date"
              name="case_creation"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formValues.case_creation}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Update Date"
              name="last_update"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formValues.last_update}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Incident Date"
              name="incident_date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formValues.incident_date}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Day Moment"
              name="case_day_moment"
              value={formValues.case_day_moment}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Case Type"
              name="case_type"
              value={formValues.case_type}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Case Province"
              name="case_province"
              value={formValues.case_province}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Case Location"
              name="case_location"
              value={formValues.case_location}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Geographic Ubication"
              name="case_geographic_ubication"
              value={formValues.case_geographic_ubication}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Case Place"
              name="case_place"
              value={formValues.case_place}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Case Form"
              name="case_form"
              value={formValues.case_form}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="case_justice"
                  checked={formValues.case_justice}
                  onChange={handleInputChange}
                />
              }
              label="Justice Achieved"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Legal Complaints"
              name="case_legal_complaints"
              value={formValues.case_legal_complaints}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="case_rape"
                  checked={formValues.case_rape}
                  onChange={handleInputChange}
                />
              }
              label="Rape"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="case_organized_crime"
                  checked={formValues.case_organized_crime}
                  onChange={handleInputChange}
                />
              }
              label="Organized Crime"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Organized Crime Notes"
              name="case_organized_crime_notes"
              value={formValues.case_organized_crime_notes}
              onChange={handleInputChange}
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Case Notes"
              name="case_notes"
              value={formValues.case_notes}
              onChange={handleInputChange}
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Case News Links"
              name="case_news_links"
              value={formValues.case_news_links}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

        </Grid>
      </form>
    </Container>
  );
};

export default CaseForm;
