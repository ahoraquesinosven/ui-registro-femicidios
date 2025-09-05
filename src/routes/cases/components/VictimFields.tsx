import {withForm} from "@/hooks/form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import formDefaultValues, {
    allGenders,
    allNationalities,
    allCaseJudicialMeasures,
} from "../formValues";

const VictimFields = withForm({
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
                            children={(field) => <field.Combo label="Género" options={allGenders} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.nationality"
                            children={(field) => <field.Combo label="Nacionalidad" options={allNationalities} />}
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
                            children={(field) => <field.Checkbox label="¿En situación de prostitución?" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.isMissingPerson"
                            children={(field) => <field.Checkbox label="¿Estuvo desaparecida?" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.isNativePeople"
                            children={(field) => <field.Checkbox label="¿Pertenece a pueblos originarios?" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.isPregnant"
                            children={(field) => <field.Checkbox label="¿Estaba embarazada?" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.hasDisabillity"
                            children={(field) => <field.Checkbox label="¿Tenía algún tipo de discapacidad?" />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="hadLegalComplaints"
                            children={(field) => <field.Checkbox label="¿Había realizado denuncias?" />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="isRape"
                            children={(field) => <field.Checkbox label="¿Fue violada o abusada?" />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="wasJudicialized"
                            children={(field) => <field.Checkbox label="¿Tenía medidas judiciales?" />}
                        />
                    </Grid>

                    <form.Subscribe
                        selector={(state) => state.values.wasJudicialized}
                        children={(wasJudicialized) => wasJudicialized && (
                            <Grid item xs={12}>
                                <form.AppField
                                    name="judicialMeasures"
                                    children={(field) => <field.MultiCombo label="Medidas judiciales" options={allCaseJudicialMeasures} />}
                                />
                            </Grid>
                        )}
                    />

                    <Grid item xs={12}>
                        <form.AppField
                            name="victim.hasChildren"
                            children={(field) => <field.YesNoUnknown label="¿Tiene hijos?" />}
                        />
                    </Grid>

                    <form.Subscribe
                        selector={(state) => state.values.victim.hasChildren === "yes"}
                        children={(hasChildren) => hasChildren && (
                            <Grid item xs={12}>
                                <form.AppField
                                    name="victim.numberOfChildren"
                                    children={(field) => <field.Text label="Número de hijos" type="number" />}
                                />
                            </Grid>
                        )}
                    />
                </Grid>
            </>
        );
    },
});

export default VictimFields;
