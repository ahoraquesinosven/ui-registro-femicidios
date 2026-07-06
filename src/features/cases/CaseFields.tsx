import Grid from "@mui/material/Grid";
import { withForm } from "@/hooks/form";
import {
  allCaseCategories,
  allCaseGeographicLocations,
  allCaseMurderWeapons,
  allCasePlaces,
  allMomentsOfDay,
  allProvinces,
  defaultFormValues,
} from "./formValues";
import * as help from "./help/caseHelp";

const CaseFields = withForm({
  defaultValues: defaultFormValues,
  render: function Render({ form }) {
    return (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="occurredAt"
            children={(field) => (
              <field.DatePicker
                label="Fecha del caso"
                helpText={help.FECHA_DEL_CASO}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="caseCategory"
            children={(field) => (
              <field.Combo
                label="Categoría"
                required={true}
                options={allCaseCategories}
                helpText={<help.CaseCategoryHelper />}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="wasItAnAttempt"
            children={(field) => (
              <field.Checkbox
                label="¿Fue un intento?"
                helpText={<help.CaseWasItAnAttemptHelper />}
              />
            )}
            listeners={{
              onChange: ({ value }) => {
                if (value)
                  form.setFieldValue(
                    "isInsufficientDataOrUnderInvestigation",
                    false,
                  );
              },
            }}
          />
        </Grid>

        <form.Subscribe
          selector={(state) => state.values.wasItAnAttempt}
          children={(wasItAnAttempt) => (
            <Grid size={{ xs: 12, sm: 6 }}>
              <form.AppField
                name="isInsufficientDataOrUnderInvestigation"
                children={(field) => (
                  <field.Checkbox
                    label="¿Aún se investiga?"
                    disabled={wasItAnAttempt}
                    helpText={<help.CaseSeInvestigaHelper />}
                  />
                )}
              />
            </Grid>
          )}
        />

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="momentOfDay"
            children={(field) => (
              <field.Combo
                label="Momento del día"
                options={allMomentsOfDay}
                helpText={help.MOMENTOS_DEL_DIA_HELPER}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="province"
            children={(field) => (
              <field.Combo
                label="Provincia"
                required={true}
                options={allProvinces}
                helpText={help.PROVINCIAS_HELPER}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="location"
            children={(field) => (
              <field.Text label="Localidad" helpText={help.LOCATION_HELPER} />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="geographicLocation"
            children={(field) => (
              <field.Combo
                label="Ubicación geográfica"
                options={allCaseGeographicLocations}
                helpText={help.UBICACION_GEOGRAFICA_HELPER}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="place"
            children={(field) => (
              <field.Combo
                label="Lugar del hecho"
                required={true}
                options={allCasePlaces}
                helpText={<help.CasePlaceHelper />}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="murderWeapon"
            children={(field) => (
              <field.Combo
                label="Forma"
                options={allCaseMurderWeapons}
                helpText={<help.MurderWeaponHelper />}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <form.AppField
            name="isRelatedToOrganizedCrime"
            children={(field) => (
              <field.Checkbox
                label="¿Fue en contexto de criminalidad organizada?"
                helpText={<help.RelatedToOrganizedCrimeHelper />}
              />
            )}
          />
        </Grid>

        <form.Subscribe
          selector={(state) => state.values.isRelatedToOrganizedCrime}
          children={(isRelatedToOrganizedCrime) =>
            isRelatedToOrganizedCrime && (
              <Grid size={12}>
                <form.AppField
                  name="organizedCrimeNotes"
                  children={(field) => (
                    <field.Text
                      label="Observaciones de Crimen Organizado"
                      multiline
                    />
                  )}
                />
              </Grid>
            )
          }
        />

        <Grid size={12}>
          <form.AppField
            name="generalNotes"
            children={(field) => (
              <field.Text label="Notas del Caso" multiline />
            )}
          />
        </Grid>

        <Grid size={12}>
          <form.AppField
            name="newsLinks"
            children={(field) => (
              <field.Text
                label="Link de la nota"
                required={true}
                multiline
                maxRows={5}
                helpText={help.NEWS_LINKS_HELPER}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <form.AppField
            name="hasMediaGenderPerspective"
            children={(field) => (
              <field.YesNoUnknown
                label="¿Los medios que cubrieron el caso lo hicieron incorporando un enfoque de perspectiva de géneros y diversidad?"
                helpText={<help.CaseMediaCoverageHelper />}
              />
            )}
          />
        </Grid>

        <form.Subscribe
          selector={(state) =>
            state.values.hasMediaGenderPerspective === "yes" ||
            state.values.hasMediaGenderPerspective === "no"
          }
          children={(hasMediaGenderPerspective) =>
            hasMediaGenderPerspective && (
              <Grid size={12}>
                <form.AppField
                  name="coverageMediaPerspectiveNotes"
                  children={(field) => (
                    <field.Text
                      label="Notas de cobertura con perspectiva de género"
                      multiline
                    />
                  )}
                />
              </Grid>
            )
          }
        />
      </Grid>
    );
  },
});

export default CaseFields;
