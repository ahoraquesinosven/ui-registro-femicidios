import {withForm} from "@/hooks/form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import formDefaultValues from "../formValues";

const VictimFields = withForm({
    defaultValues: formDefaultValues,
    render: function Render({ form }) {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Datos Personales</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <form.AppField
                            name="victim.fullName"
                            children={(field) => <field.Text label="Nombre y Apellido" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.age"
                            children={(field) => <field.Text label="Edad" type="number" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.gender"
                            children={(field) => <field.Text label="Género" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.nationality"
                            children={(field) => <field.Text label="Nacionalidad" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.occupation"
                            children={(field) => <field.Text label="Ocupación" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.isSexualWorker"
                            children={(field) => <field.YesNoUnknown label="¿Es trabajadora sexual?" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.isMissingPerson"
                            children={(field) => <field.YesNoUnknown label="¿Estuvo desaparecida?" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.isNativePeople"
                            children={(field) => <field.YesNoUnknown label="¿Pertenece a pueblos originarios?" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.isPregnant"
                            children={(field) => <field.YesNoUnknown label="¿Embarazada?" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.hasDisabillity"
                            children={(field) => <field.YesNoUnknown label="¿Discapacidad?" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.hasChildren"
                            children={(field) => <field.YesNoUnknown label="¿Tiene hijos?" />}
                        />
                    </Grid>
                </Grid>
            </>
        );
    },
});

export default VictimFields;
