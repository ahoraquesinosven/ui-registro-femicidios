import { withForm } from "@/hooks/form";
import Grid from "@mui/material/Grid";
import formDefaultValues, {
  allMomentsOfDay,
  allProvinces,
  allCaseGeographicLocations,
  allCasePlaces,
  allCaseMurderWeapons,
  allCaseCategories,
} from "../formValues";

const CaseFields = withForm({
  defaultValues: formDefaultValues,
  render: function Render({ form }) {
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
              children={(field) => <field.Combo label="Categoría" required={true} options={allCaseCategories}  />}
            />
          </Grid>
          <Grid item xs={12} sm={6}> 
            <form.AppField
              name="wasItAnAttempt"
              children={(field) => <field.Checkbox label="¿Fue un intento?" />}
              listeners={{
                onChange: ({ value }) => {
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
              children={(field) => <field.Combo label="Provincia" options={allProvinces} />}
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
              children={(field) => <field.Combo label="Lugar del hecho" options={allCasePlaces} />}
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
                  children={(field) => <field.Text label="Observaciones de Crimen Organizado" multiline rows={3} />}
                />
              </Grid>
            )}
          />

          <Grid item xs={12}>
            <form.AppField
              name="generalNotes"
              children={(field) => <field.Text label="Notas del Caso" multiline rows={3} />}
            />
          </Grid>

          <Grid item xs={12}>
            <form.AppField
              name="newsLinks"
              children={(field) => <field.Text label="Link de la nota" multiline />}
            />
          </Grid>
        </Grid>
      </>
    );
  }
});

export default CaseFields;
