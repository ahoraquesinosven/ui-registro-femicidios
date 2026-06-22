import { validateIntegerField, withForm } from "@/hooks/form";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
    defaultFormValues,
    allAggressorBehaviorsPostCase,
    allAggressorSecurityForces,
    allGenders,
    allCaseVictimBondsAggressor,
} from "../formValues";

// This list exposes which fields that actually belong to the case are being
// displayed here, in order to be able to track errors for the component
// eslint-disable-next-line react-refresh/only-export-components
export const controlledFields = new Set([
    "victimBondAggressor",
    ...Object.getOwnPropertyNames(defaultFormValues.aggressor).map((field) => `aggressor.${field}`),
]);

const AGRESSOR_NAME_HELPER = "Se completa el nombre y /o el apellido del femicida o sospechoso o su apodo. En las noticias a veces aparecen las iniciales, también lo cargamos. En caso de que no haya ninguno de los datos, el campo no se completa.";

const AggressorAgeHelper = () => (
    <>
        <p>
            En este espacio se carga la edad del femicida o sospechoso. De acuerdo a la información recabada de los medios.
        </p>
        <p>Si no se tiene la edad, se deja vacío.</p>

    </>
);

const VictimBondsAggressorHelper = () => (
    <>
        <p>
            Esta categoría de análisis nos permite ver el impacto de la violencia machista en la configuración de las relaciones interpersonales.
        </p>
        <p>Hace referencia  a la relación que tiene la víctima con el agresor. En el caso de femicidio vinculado se carga la relación con la mujer que es la víctima.</p>
        <p>
            Si no está contemplada entre las opciones mencionadas, elegir la opción más cercana y se debe sugerir la nueva opción <a href="https://docs.google.com/spreadsheets/d/1UruAWj0X2Fw5cBapc-7-sHuGcDyq0-pCfsVECiWCNIo/edit?gid=1735086912#gid=1735086912" target="_blank">agregando los detalles en esta planilla.</a>
        </p>

    </>
);


const AggressorBehaviorsPostCaseHelper = () => (
    <>
        <p>
            Con el objetivo de poder contar con todos los elementos que intervienen en los femicidios (o intentos) y transfemicidios (o intentos) es necesario conocer lo que hizo el femicida o agresor luego de cometer el hecho.
        </p>
        <p>En esta instancia se prioriza la primera conducta del violento y se completa entre las siguientes opciones.</p>

    </>
);





const AggressorFields = withForm({
    defaultValues: defaultFormValues,
    render: function Render({ form }) {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Datos Personales</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <form.AppField
                            name="aggressor.fullName"
                            children={(field) => <field.Text label="Nombre y Apellido" helpText={AGRESSOR_NAME_HELPER} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="aggressor.age"
                            validators={{ onBlur: validateIntegerField }}
                            children={(field) => <field.Text label="Edad" type="text" inputMode="numeric" helpText={<AggressorAgeHelper />} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="aggressor.gender"
                            children={(field) => <field.Combo label="Género" options={allGenders} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victimBondAggressor"
                            children={(field) => <field.Combo label="Vínculo con la víctima" options={allCaseVictimBondsAggressor} helpText={<VictimBondsAggressorHelper />} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="aggressor.behaviourPostCase"
                            children={(field) => <field.MultiCombo label="Conducta del agresor luego del caso" options={allAggressorBehaviorsPostCase} helpText={<AggressorBehaviorsPostCaseHelper />} />}
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

                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>Historial</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="aggressor.hasLegalComplaintHistory"
                            children={(field) => <field.Checkbox label="¿Tiene en su historial denuncias previas?" />}
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
                </Grid>
            </>
        );
    },
});

export default AggressorFields;
