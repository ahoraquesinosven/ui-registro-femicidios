import { withForm } from "@/hooks/form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
    defaultFormValues,
    allGenders,
    allNationalities,
    allCaseJudicialMeasures,
} from "../formValues";

// This list exposes which fields that actually belong to the case are being
// displayed here, in order to be able to track errors for the component
// eslint-disable-next-line react-refresh/only-export-components
export const controlledFields = new Set([
    "isRape",
    "hadLegalComplaints",
    "wasJudicialized",
    "totalLegalComplaints",
    "judicialMeasures",
    ...Object.getOwnPropertyNames(defaultFormValues.victim).map((field) => `victim.${field}`),
]);

const VICTIM_NAME_HELPER = "Este dato es sumamente importante para identificar a las víctimas de violencia de género. Si sólo se tiene el nombre o el apellido se agrega la información que se tiene. En las noticias a veces aparecen las iniciales, también lo cargamos. En caso de que no haya ninguno de los datos, el campo no se completa.";
const VictimAgeHelper = () => (
    <>
        <p>
            El fenómeno de la violencia de género se presenta de diversas maneras a lo largo de la vida de las mujeres y disidencias. Es por eso que en nuestro análisis incorporamos el segmento etario de las víctimas. Si se tiene el dato, se completa el número.
        </p>
        <p>
            Si la víctima tiene menos de 1 año, por ejemplo 8 meses se divide, es decir 8 meses dividido por los 12 meses (8/12) y se completa con el resultado que, en este caso, es 0. 66.
        </p>
        <p>Si no se tiene la edad, se deja vacío.</p>

    </>
);
const VICTIM_GENDER_HELPER = "Las opciones HOMBRE y NO BINARIO se pueden utilizar sólo en el caso de FEMICIDIOS VINCULADOS, porque nosotras registramos sólo casos de personas feminizadas. En caso de que no se tenga el dato, se deja vacío.";

const NationalityHelper = () => (
    <>
        <p>
            Se completa la nacionalidad de la víctima. Si no se tiene el dato, se deja vacío.

        </p>
        <p>
            Si no está contemplada entre las opciones mencionadas, elegir la opción “Otra” y se debe sugerir la nueva opción <a href="https://docs.google.com/spreadsheets/d/1UruAWj0X2Fw5cBapc-7-sHuGcDyq0-pCfsVECiWCNIo/edit?gid=1735086912#gid=1735086912" target="_blank">agregando los detalles en esta planilla.</a>
        </p>

    </>
);
const VICTIM_OCCUPATION_HELPER = "Es un dato muy invisibilizado en los medios, ya que no suele aparecer la ocupación, profesión de la persona víctima de violencia por razones de género. En caso de que se encuentre información al respecto, se completa de manera manual";
const VICTIM_PROSTITUTION_HELPER = "Mujeres en contexto de violencia de género que ejercen la prostitución. Se elige la opción de acuerdo a la información brindada o inferida por los medios";
const VICTIM_MISSING_PERSON_HELPER = "En este espacio se consigna si la mujer víctima de violencia de género o persona LGTBIQ+, previo al hecho violento o cuando se encontró su cuerpo, estuvo o no desaparecida.";
const VICTIM_NATIVE_PEOPLE_HELPER = "Si la mujer o disidencia  provienen de un pueblo originario";
const VICTIM_PREGNANT_HELPER = "Refiere al hecho de si la mujer víctima de violencia de género estaba embarazada cuando ocurrió el hecho.";
const VICTIM_DISABILITY_HELPER = "La discapacidad es un elemento de mucha vulnerabilidad para las personas víctimas de violencia de género, lo que las expone mucho más a estas situaciones violentas. Personas en contexto de violencia de género que tenían algún tipo de discapacidad. Se elige la opción de acuerdo a la información brindada o inferida por los medios";
const VICTIM_RAPE_HELPER = "Si bien, en nuestro registro no se monitorean los delitos sexuales específicamente, es relevante poder contar con estos elementos (si es que los hay) en los casos para generar estadísticas que permitan conocer y analizar la presencia de los mismos en los casos que cargamos.";

const VictimJudicializedHelper = () => (
    <>
        <p>
            El registro de este dato es fundamental para poder relevar información sobre el accionar de la justicia en los casos de violencia de género, luego de que la/s persona/s que están en situación de violencia de género han recurrido a la misma. Asimismo, permite observar el grado de protección que tenía la mujer y diversidad víctima de violencia.
            Esta información, de a poco, está siendo más visibilizada por los medios.
        </p>
        <p>
            Si la nota menciona que tuvo alguna medida judicial, significa que existía una denuncia, así que el sistema selecciona automaticamente ¿Había realizado una denuncia?
        </p>

    </>
);
const VICTIM_LEGAL_COMPLAINTS_HELPER = "Se refiere a si la víctima había realizado denuncias previas al momento del hecho. Se elige la opción de acuerdo a la información brindada o inferida por los medios.";

function isValidNumber(value: string) {
    return Number.isFinite(Number(value));
}

const VictimFields = withForm({
    defaultValues: defaultFormValues,
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
                            children={(field) => <field.Text label="Nombre y Apellido" helpText={VICTIM_NAME_HELPER} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.age"
                            children={(field) => <field.Text label="Edad" type="text" inputMode="decimal" helpText={<VictimAgeHelper />} />}
                            validators={{
                                onBlur: ({value}) => {
                                    !isValidNumber(value) ? "debe ser un número válido" : undefined
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.gender"
                            children={(field) => <field.Combo label="Género" options={allGenders} helpText={VICTIM_GENDER_HELPER} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.nationality"
                            children={(field) => <field.Combo label="Nacionalidad" options={allNationalities} helpText={<NationalityHelper />} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.occupation"
                            children={(field) => <field.Text label="Ocupación" helpText={VICTIM_OCCUPATION_HELPER} />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.isSexualWorker"
                            children={(field) => <field.Checkbox label="¿En situación de prostitución?" helpText={VICTIM_PROSTITUTION_HELPER} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.isMissingPerson"
                            children={(field) => <field.Checkbox label="¿Estuvo desaparecida?" helpText={VICTIM_MISSING_PERSON_HELPER} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.isNativePeople"
                            children={(field) => <field.Checkbox label="¿Pertenece a pueblos originarios?" helpText={VICTIM_NATIVE_PEOPLE_HELPER} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.isPregnant"
                            children={(field) => <field.Checkbox label="¿Estaba embarazada?" helpText={VICTIM_PREGNANT_HELPER} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="victim.hasDisabillity"
                            children={(field) => <field.Checkbox label="¿Tenía algún tipo de discapacidad?" helpText={VICTIM_DISABILITY_HELPER} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="isRape"
                            children={(field) => <field.Checkbox label="¿Fue violada o abusada?" helpText={VICTIM_RAPE_HELPER} />}
                        />
                    </Grid>

                    <form.Subscribe
                        selector={(state) => state.values.wasJudicialized}
                        children={(wasJudicialized) => (
                            <Grid item xs={12} sm={6}>
                                <form.AppField
                                    name="hadLegalComplaints"
                                    children={(field) => <field.Checkbox label="¿Había realizado denuncias?" disabled={wasJudicialized} helpText={VICTIM_LEGAL_COMPLAINTS_HELPER} />}
                                />
                            </Grid>
                        )}
                    />

                    <Grid item xs={12} sm={6}>
                        <form.AppField
                            name="wasJudicialized"
                            children={(field) => <field.Checkbox label="¿Tenía medidas judiciales?" helpText={<VictimJudicializedHelper />}  /> }
                            listeners={{
                                onChange: ({value}) => {
                                    if (value)
                                        form.setFieldValue('hadLegalComplaints', true)
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <form.Subscribe
                            selector={(state) => state.values.hadLegalComplaints}
                            children={(hadLegalComplaints) => hadLegalComplaints && (

                                <form.AppField
                                    name="totalLegalComplaints"
                                    children={(field) => <field.Text label="Indicar cantidad de denuncias" />}
                                />

                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <form.Subscribe
                            selector={(state) => state.values.wasJudicialized}
                            children={(wasJudicialized) => wasJudicialized && (

                                <form.AppField
                                    name="judicialMeasures"
                                    children={(field) => <field.MultiCombo label="Medidas judiciales" options={allCaseJudicialMeasures} />}
                                />

                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <form.AppField
                            name="victim.hasChildren"
                            children={(field) => <field.YesNoUnknown label="¿Tiene hijos?" />}
                        />
                    </Grid>

                    <form.Subscribe
                        selector={(state) => state.values.victim.hasChildren === "yes"}
                        children={(hasChildren) => hasChildren && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <form.AppField
                                        name="victim.numberOfChildren"
                                        children={(field) => <field.Text label="Número de hijos" type="number" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <form.AppField
                                        name="victim.ageOfChildren"
                                        children={(field) => <field.Text label="Edad hijxs - Cargar cada edad y presionar Enter" multiline />}
                                    />
                                </Grid>
                            </>
                        )}
                    />
                </Grid>
            </>
        );
    },
});

export default VictimFields;
