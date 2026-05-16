import {withForm} from "@/hooks/form";
import Grid from "@mui/material/Grid";
import {controlledFields as aggressorControlledFields} from "./AggressorFields";
import {controlledFields as victimControlledFields} from "./VictimFields";
import {
  defaultFormValues,
  allMomentsOfDay,
  allProvinces,
  allCaseGeographicLocations,
  allCasePlaces,
  allCaseMurderWeapons,
  allCaseCategories,
} from "../formValues";

function difference<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter(x => !b.has(x)));
}

// This list exposes which fields that actually belong to the case are being
// displayed here, in order to be able to track errors for the component
// eslint-disable-next-line react-refresh/only-export-components
export const controlledFields = difference(
  new Set(Object.getOwnPropertyNames(defaultFormValues)),
  new Set(["victim", "aggressor", ...aggressorControlledFields, ...victimControlledFields]),
);

const CaseFields = withForm({
  defaultValues: defaultFormValues,
  render: function Render({form}) {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <form.AppField
              name="occurredAt"
              children={(field) => <field.DatePicker label="Fecha del caso" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="caseCategory"
              children={(field) => <field.Combo label="Categoría" required={true} options={allCaseCategories} />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <form.AppField
              name="wasItAnAttempt"
              children={(field) => <field.Checkbox label="¿Fue un intento?" />}
              listeners={{
                onChange: ({value}) => {
                  if (value)
                    form.setFieldValue('isInsufficientDataOrUnderInvestigation', false)
                },
              }}
            />
          </Grid>

          <form.Subscribe
            selector={(state) => state.values.wasItAnAttempt}
            children={(wasItAnAttempt) => (
              <Grid item xs={12} sm={6}>
                <form.AppField
                  name="isInsufficientDataOrUnderInvestigation"
                  children={(field) => <field.Checkbox label="¿Aún se investiga?" disabled={wasItAnAttempt} />}
                />
              </Grid>
            )}

          />

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="momentOfDay"
              children={(field) => <field.Combo label="Momento del día" options={allMomentsOfDay} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="province"
              children={(field) => <field.Combo label="Provincia" required={true} options={allProvinces} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="location"
              children={(field) => <field.Text label="Localidad" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="geographicLocation"
              children={(field) => <field.Combo label="Ubicación geográfica" options={allCaseGeographicLocations} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="place"
              children={(field) => <field.Combo label="Lugar del hecho" required={true} options={allCasePlaces} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="murderWeapon"
              children={(field) => <field.Combo label="Forma" options={allCaseMurderWeapons} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="isRelatedToOrganizedCrime"
              children={(field) => <field.Checkbox label="¿Fue en contexto de criminalidad organizada?" />}
            />
          </Grid>

          <form.Subscribe
            selector={(state) => state.values.isRelatedToOrganizedCrime}
            children={(isRelatedToOrganizedCrime) => isRelatedToOrganizedCrime && (
              <Grid item xs={12}>
                <form.AppField
                  name="organizedCrimeNotes"
                  children={(field) => <field.Text label="Observaciones de Crimen Organizado" multiline />}
                />
              </Grid>
            )}
          />

          <Grid item xs={12}>
            <form.AppField
              name="generalNotes"
              children={(field) => <field.Text label="Notas del Caso" multiline />}
            />
          </Grid>

          <Grid item xs={12}>
            <form.AppField
              name="newsLinks"
              children={(field) => <field.Text label="Link de la nota" required={true} multiline maxRows={5} />}
            />
          </Grid>


          <Grid item xs={12}>
            <form.AppField
              name="hasMediaGenderPerspective"
              children={(field) => <field.YesNoUnknown label="¿Los medios que cubrieron el caso lo hicieron incorporando un enfoque de perspectiva de géneros y diversidad?" />}
            />
          </Grid>

          <form.Subscribe
            selector={(state) => state.values.hasMediaGenderPerspective === "yes" || state.values.hasMediaGenderPerspective === "no"}
            children={(hasMediaGenderPerspective) => hasMediaGenderPerspective && (
              <>
                <Grid item xs={12}>
                  <form.AppField
                    name="coverageMediaPerspectiveNotes"
                    children={(field) => <field.Text label="Notas de cobertura con perspectiva de género" multiline rows={3} />}
                  />
                </Grid>
              </>
            )}
          />

        </Grid>
      </>
    );
  }
});

export default CaseFields;
