import {withForm} from "@/hooks/form";
import Grid from "@mui/material/Grid";
import formDefaultValues from "../formValues";

const CaseFields = withForm({
  defaultValues: formDefaultValues,
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
              name="momentOfDay"
              children={(field) => <field.Text label="Momento del día" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="province"
              children={(field) => <field.Text label="Provincia" />}
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
              children={(field) => <field.Text label="Ubicación geográfica" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="place"
              children={(field) => <field.Text label="Lugar del hecho" />}
            />
          </Grid>

          <Grid item xs={12}>
            <form.AppField
              name="murderWeapon"
              children={(field) => <field.Text label="Forma" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="wasJudicialized"
              children={(field) => <field.Checkbox label="¿Había alguna medida judicial?" />}
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
