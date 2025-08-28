import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { withForm } from "@/hooks/form";
import formDefaultValues from "../formValues";

const VictimFields = withForm({
    defaultValues: formDefaultValues,
    render: function Render({ form }) {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <form.Field name="victim.fullName" children={(field) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Nombre y Apellido"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)} />
                        )} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.Field name="victim.age" children={(field) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Edad"
                                type="number"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)} />
                        )} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.Field name="victim.gender" children={(field) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Género"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)} />
                        )} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.Field name="victim.nationality" children={(field) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Nacionalidad"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)} />
                        )} />
                    </Grid>
                    <Grid item xs={12}>
                        <form.Field name="victim.occupation" children={(field) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Ocupación"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)} />
                        )} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.Field name="victim.isSexualWorker" children={(field) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={field.name}
                                        checked={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.checked)} />
                                }
                                label="Es trabajadora sexual"
                            />
                        )} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.Field name="victim.isMissingPerson" children={(field) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={field.name}
                                        checked={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.checked)} />
                                }
                                label="Desaparecida"
                            />
                        )} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.Field name="victim.isNativePeople" children={(field) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={field.name}
                                        checked={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.checked)} />
                                }
                                label="Pueblo Originario"
                            />
                        )} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.Field name="victim.isPregnant" children={(field) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={field.name}
                                        checked={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.checked)} />
                                }
                                label="Embarazada"
                            />
                        )} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.Field name="victim.hasDisabillity" children={(field) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={field.name}
                                        checked={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.checked)} />
                                }
                                label="Discapacidad"
                            />
                        )} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.Field name="victim.hasChildren" children={(field) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={field.name}
                                        checked={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.checked)} />
                                }
                                label="Con Hijos"
                            />
                        )} />
                    </Grid>
                </Grid>
            </>
        );
    },
});

export default VictimFields;
