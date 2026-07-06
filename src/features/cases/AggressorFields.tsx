import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { validateIntegerField, withForm } from "@/hooks/form";
import {
  allAggressorBehaviorsPostCase,
  allAggressorSecurityForces,
  allCaseVictimBondsAggressor,
  allGenders,
  defaultFormValues,
} from "./formValues";
import * as help from "./help/aggressorHelp";

const AggressorFields = withForm({
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
            name="aggressor.fullName"
            children={(field) => (
              <field.Text
                label="Nombre y Apellido"
                helpText={help.AGRESSOR_NAME_HELPER}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="aggressor.age"
            validators={{ onBlur: validateIntegerField }}
            children={(field) => (
              <field.Text
                label="Edad"
                type="text"
                inputMode="numeric"
                helpText={<help.AggressorAgeHelper />}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="aggressor.gender"
            children={(field) => (
              <field.Combo label="Género" options={allGenders} />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="victimBondAggressor"
            children={(field) => (
              <field.Combo
                label="Vínculo con la víctima"
                options={allCaseVictimBondsAggressor}
                helpText={<help.VictimBondsAggressorHelper />}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="aggressor.behaviourPostCase"
            children={(field) => (
              <field.MultiCombo
                label="Conducta del agresor luego del caso"
                options={allAggressorBehaviorsPostCase}
                helpText={<help.AggressorBehaviorsPostCaseHelper />}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <form.AppField
            name="aggressor.belongsSecurityForce"
            children={(field) => (
              <field.Checkbox
                label="¿Pertenece a alguna fuerza?"
                helpText={help.AGRESSOR_BELONGS_SECURITY_FORCE_HELPER}
              />
            )}
          />
        </Grid>

        <form.Subscribe
          selector={(state) => state.values.aggressor.belongsSecurityForce}
          children={(belongsSecurityForce) =>
            belongsSecurityForce && (
              <Grid size={12}>
                <form.AppField
                  name="aggressor.securityForce"
                  children={(field) => (
                    <field.Combo
                      label="Fuerza a la que pertenece"
                      options={allAggressorSecurityForces}
                      helpText={<help.AggressorSecurityForceHelper />}
                    />
                  )}
                />
              </Grid>
            )
          }
        />

        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Historial
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="aggressor.hasLegalComplaintHistory"
            children={(field) => (
              <field.Checkbox
                label="¿Tiene en su historial denuncias previas?"
                helpText={help.AGRESSOR_LEGAL_COMPLAINT_HISTORY_HELPER}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="aggressor.hasPreviousCases"
            children={(field) => (
              <field.Checkbox
                label="¿Tiene en su historial más víctimas?"
                helpText={help.AGRESSOR_PREVIOUS_CASES_HELPER}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <form.AppField
            name="aggressor.wasInPrison"
            children={(field) => (
              <field.Checkbox
                label="¿Estuvo preso por delitos relacionados con violencia?"
                helpText={help.AGRESSOR_WAS_IN_PRISON_HELPER}
              />
            )}
          />
        </Grid>
      </Grid>
    );
  },
});

export default AggressorFields;
