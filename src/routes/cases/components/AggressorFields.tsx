import { TextField, Checkbox, FormControlLabel, Grid, Container, Typography, Divider } from '@mui/material';

type AggressorFormProps = {
    formValues: {
        fullName?: string,
        age?: string,
        gender?: string,
        hasLegalComplaintHistory?: boolean,
        hasPreviousCases?: boolean,
        wasInPrison?: boolean,
        behaviourPostCase?: string,
    },
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AggressorForm = ({ formValues, handleInputChange, handleCheck }: AggressorFormProps) => {
    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Informacion de Victimario
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Datos Personales</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Nombre y Apellido"
                        name="fullName"
                        value={formValues.fullName || ''}
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
                        value={formValues.age || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Genero"
                        name="gender"
                        value={formValues.gender || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Coportamiento post-caso"
                        name="behaviourPostCase"
                        multiline
                        rows={4}
                        value={formValues.behaviourPostCase || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ mt: 3, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>Historial</Typography> {/* Add a sub-heading */}
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="hasLegalComplaintHistory"
                                checked={!!formValues.hasLegalComplaintHistory}
                                onChange={handleCheck}
                            />
                        }
                        label="Historial legal"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="hasPreviousCases"
                                checked={!!formValues.hasPreviousCases}
                                onChange={handleCheck}
                            />
                        }
                        label="Tiene casos previos"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="wasInPrison"
                                checked={!!formValues.wasInPrison}
                                onChange={handleCheck}
                            />
                        }
                        label="Estuvo preso"
                    />
                </Grid>

            </Grid>
        </Container>
    );
};

export default AggressorForm;
