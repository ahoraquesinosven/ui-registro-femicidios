import { withForm } from '@/hooks/form';
import Grid from '@mui/material/Grid';
import { allCaseCategories, allCaseMurderWeapons, allCaseVictimBondsAggressor, allProvinces } from './formValues';
import { defaultSearchOptions } from './searchFilters';

// Filter grid shared by the cases list and the dashboard. The dashboard hides the
// name filters since /cases/stats doesn't accept them.
const CaseFilterFields = withForm({
  defaultValues: defaultSearchOptions,
  props: {
    showNames: true,
  },
  render: function Render({ form, showNames }) {
    return (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <form.AppField
            name='fromDate'
            children={(field) => <field.DatePicker label="Desde" clearable />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <form.AppField
            name='toDate'
            children={(field) => <field.DatePicker label="Hasta" clearable />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <form.AppField
            name='province'
            children={(field) => <field.Combo label="Provincia" options={allProvinces} />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <form.AppField
            name='location'
            children={(field) => <field.Text label="Localidad" />} />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <form.AppField
            name='caseCategory'
            children={(field) => <field.Combo label="Categoría" options={allCaseCategories} />} />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <form.AppField
            name='wasItAnAttempt'
            children={(field) => <field.YesNoUnknown label="¿Fue un intento?" />} />
        </Grid>


        <Grid size={{ xs: 12, sm: 3 }}>
          <form.AppField
            name='murderWeapon'
            children={(field) => <field.Combo label="Forma" options={allCaseMurderWeapons} />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <form.AppField
            name='victimBondAggressor'
            children={(field) => <field.Combo label="Vínculo con la víctima" options={allCaseVictimBondsAggressor} />} />
        </Grid>

        {showNames && (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <form.AppField
                name='victimFullName'
                children={(field) => <field.Text label="Nombre de la víctima" />} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <form.AppField
                name='aggressorFullName'
                children={(field) => <field.Text label="Nombre del agresor" />} />
            </Grid>
          </>
        )}
      </Grid>
    );
  },
});

export default CaseFilterFields;
