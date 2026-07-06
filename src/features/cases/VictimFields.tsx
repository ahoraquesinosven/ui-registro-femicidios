import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  validateDecimalField,
  validateIntegerField,
  withForm,
} from "@/hooks/form";
import {
  allCaseJudicialMeasures,
  allGenders,
  allNationalities,
  defaultFormValues,
} from "./formValues";
import * as help from "./help/victimHelp";

const VictimFields = withForm({
  defaultValues: defaultFormValues,
  render: function Render({ form }) {
    return (
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h6" gutterBottom>
            Datos Personales
          </Typography>
        </Grid>

        <Grid size={12}>
          <form.AppField
            name="victim.fullName"
            children={(field) => (
              <field.Text
                label="Nombre y Apellido"
                helpText={help.VICTIM_NAME_HELPER}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="victim.age"
            validators={{ onBlur: validateDecimalField }}
            children={(field) => (
              <field.Text
                label="Edad"
                type="text"
                inputMode="decimal"
                helpText={<help.VictimAgeHelper />}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="victim.gender"
            children={(field) => (
              <field.Combo
                label="Género"
                options={allGenders}
                helpText={help.VICTIM_GENDER_HELPER}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="victim.nationality"
            children={(field) => (
              <field.Combo
                label="Nacionalidad"
                options={allNationalities}
                helpText={<help.NationalityHelper />}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="victim.occupation"
            children={(field) => (
              <field.Text
                label="Ocupación"
                helpText={help.VICTIM_OCCUPATION_HELPER}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="victim.isSexualWorker"
            children={(field) => (
              <field.Checkbox
                label="¿En situación de prostitución?"
                helpText={help.VICTIM_PROSTITUTION_HELPER}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="victim.isMissingPerson"
            children={(field) => (
              <field.Checkbox
                label="¿Estuvo desaparecida?"
                helpText={help.VICTIM_MISSING_PERSON_HELPER}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="victim.isNativePeople"
            children={(field) => (
              <field.Checkbox
                label="¿Pertenece a pueblos originarios?"
                helpText={help.VICTIM_NATIVE_PEOPLE_HELPER}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="victim.isPregnant"
            children={(field) => (
              <field.Checkbox
                label="¿Estaba embarazada?"
                helpText={help.VICTIM_PREGNANT_HELPER}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="victim.hasDisabillity"
            children={(field) => (
              <field.Checkbox
                label="¿Tenía algún tipo de discapacidad?"
                helpText={help.VICTIM_DISABILITY_HELPER}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="isRape"
            children={(field) => (
              <field.Checkbox
                label="¿Fue violada o abusada?"
                helpText={help.VICTIM_RAPE_HELPER}
              />
            )}
          />
        </Grid>

        <form.Subscribe
          selector={(state) => state.values.wasJudicialized}
          children={(wasJudicialized) => (
            <Grid size={{ xs: 12, sm: 6 }}>
              <form.AppField
                name="hadLegalComplaints"
                children={(field) => (
                  <field.Checkbox
                    label="¿Había realizado denuncias?"
                    disabled={wasJudicialized}
                    helpText={help.VICTIM_LEGAL_COMPLAINTS_HELPER}
                  />
                )}
              />
            </Grid>
          )}
        />

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="wasJudicialized"
            children={(field) => (
              <field.Checkbox
                label="¿Tenía medidas judiciales?"
                helpText={<help.VictimJudicializedHelper />}
              />
            )}
            listeners={{
              onChange: ({ value }) => {
                if (value) form.setFieldValue("hadLegalComplaints", true);
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.Subscribe
            selector={(state) => state.values.hadLegalComplaints}
            children={(hadLegalComplaints) =>
              hadLegalComplaints && (
                <form.AppField
                  name="totalLegalComplaints"
                  validators={{ onBlur: validateIntegerField }}
                  children={(field) => (
                    <field.Text
                      label="Indicar cantidad de denuncias"
                      type="text"
                      inputMode="numeric"
                    />
                  )}
                />
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.Subscribe
            selector={(state) => state.values.wasJudicialized}
            children={(wasJudicialized) =>
              wasJudicialized && (
                <form.AppField
                  name="judicialMeasures"
                  children={(field) => (
                    <field.MultiCombo
                      label="Medidas judiciales"
                      options={allCaseJudicialMeasures}
                    />
                  )}
                />
              )
            }
          />
        </Grid>

        <Grid size={12}>
          <form.AppField
            name="victim.hasChildren"
            children={(field) => (
              <field.YesNoUnknown
                label="¿Tiene hijos?"
                helpText={<help.VictimChildrenHelper />}
              />
            )}
          />
        </Grid>

        <form.Subscribe
          selector={(state) => state.values.victim.hasChildren === "yes"}
          children={(hasChildren) =>
            hasChildren && (
              <>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <form.AppField
                    name="victim.numberOfChildren"
                    validators={{ onBlur: validateIntegerField }}
                    children={(field) => (
                      <field.Text
                        label="Número de hijos"
                        type="text"
                        inputMode="numeric"
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <form.AppField
                    name="victim.ageOfChildren"
                    children={(field) => (
                      <field.Text
                        label="Edad hijxs - Cargar cada edad y presionar Enter"
                        multiline
                      />
                    )}
                  />
                </Grid>
              </>
            )
          }
        />
      </Grid>
    );
  },
});

export default VictimFields;
