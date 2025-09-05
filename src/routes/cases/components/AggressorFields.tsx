import {withForm} from "@/hooks/form";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import formDefaultValues, {
    allAggressorBehaviorsPostCase,
    allAggressorSecurityForces,
    allGenders
} from "../formValues";

const AggressorFields = withForm({
    defaultValues: formDefaultValues,
    render: function Render({form}) {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Datos Personales</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <form.AppField
                            name="aggressor.fullName"
                            children={(field) => <field.Text label="Nombre y Apellido" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="aggressor.age"
                            children={(field) => <field.Text label="Edad" type="number" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="aggressor.gender"
                            children={(field) => <field.Combo label="Género" options={allGenders} />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <form.AppField
                            name="aggressor.behaviourPostCase"
                            children={(field) => <field.Combo label="Conducta del agresor luego del caso" options={allAggressorBehaviorsPostCase} />}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider sx={{my: 2}} />
                        <Typography variant="h6" gutterBottom>Historial</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="aggressor.hasLegalComplaintHistory"
                            children={(field) => <field.Checkbox label="¿Tiene denuncias previas?" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="aggressor.hasPreviousCases"
                            children={(field) => <field.Checkbox label="¿Tiene en su historial más víctimas?" />}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <form.AppField
                            name="aggressor.wasInPrison"
                            children={(field) => <field.Checkbox label="¿Estuvo preso por delitos relacionados con violencia?" />}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <form.AppField
                            name="aggressor.belongsSecurityForce"
                            children={(field) => <field.Checkbox label="¿Pertenece a alguna fuerza?" />}
                        />
                    </Grid>

                    <form.Subscribe
                        selector={(state) => state.values.aggressor.belongsSecurityForce}
                        children={(belongsSecurityForce) => belongsSecurityForce && (
                            <Grid item xs={12}>
                                <form.AppField
                                    name="aggressor.securityForce"
                                    children={(field) => <field.Combo label="Fuerza a la que pertenece" options={allAggressorSecurityForces} />}
                                />
                            </Grid>
                        )}
                    />
                </Grid>
            </>
        );
    },
});

export default AggressorFields;
