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
              children={(field) => <field.TextField label="Fecha del caso" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="momentOfDay"
              children={(field) => <field.TextField label="Momento del día" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="province"
              children={(field) => <field.TextField label="Provincia" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="location"
              children={(field) => <field.TextField label="Localidad" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="geographicLocation"
              children={(field) => <field.TextField label="Ubicación geográfica" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="place"
              children={(field) => <field.TextField label="Lugar" />}
            />
          </Grid>

          <Grid item xs={12}>
            <form.AppField
              name="murderWeapon"
              children={(field) => <field.TextField label="Arma" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="wasJudicialized"
              children={(field) => <field.YesNoUnknown label="¿Está judicializado?" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="hadLegalComplaints"
              children={(field) => <field.YesNoUnknown label="¿Tenía denuncias?" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="isRape"
              children={(field) => <field.YesNoUnknown label="¿Con violación?" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="isRelatedToOrganizedCrime"
              children={(field) => <field.YesNoUnknown label="¿Relacionado con crimen organizado?" />}
            />
          </Grid>

          <Grid item xs={12}>
            <form.AppField
              name="organizedCrimeNotes"
              children={(field) => <field.TextField label="Notas de Crimen Organizado" multiline rows={3} />}
            />
          </Grid>

          <Grid item xs={12}>
            <form.AppField
              name="generalNotes"
              children={(field) => <field.TextField label="Notas del Caso" multiline rows={3} />}
            />
          </Grid>

          <Grid item xs={12}>
            <form.AppField
              name="newsLinks"
              children={(field) => <field.TextField label="Links relacionados" multiline />}
            />
          </Grid>
        </Grid>
      </>
    );
  }
});

export default CaseFields;
