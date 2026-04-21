import {CaseCategory, CaseMurderWeapon, CaseVictimBondAggressor, ListCaseFilters, listCases, Province} from '@/api/aqsnv/cases';
import {useAccessToken} from "@/hooks/auth";
import {useAppForm} from '@/hooks/form';
import {stringToOptionalEnum} from '@/utils/cast';
import {allCaseCategories, allProvinces, allCaseMurderWeapons, allCaseVictimBondsAggressor} from './formValues';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import dayjs, {Dayjs} from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc';
import {useState} from 'react';
import {useQuery} from 'react-query';

dayjs.extend(dayjsUtc);

const defaultSearchOptions = {
  fromDate: dayjs().startOf("year"),
  toDate: null as Dayjs | null,
  province: null as string | null,
  location: "",
  caseCategory: null as string | null,
  murderWeapon: null as string | null,
  victimBondAggressor: null as string | null,
  victimFullName: "",
  aggressorFullName: "",
};

const searchOptionsToListCaseFilters = (searchOptions: typeof defaultSearchOptions): ListCaseFilters => ({
  fromDate: searchOptions.fromDate?.format("YYYY-MM-DD"),
  toDate: searchOptions.toDate?.format("YYYY-MM-DD"),
  province: stringToOptionalEnum<Province>(searchOptions.province),
  location: searchOptions.location,
  caseCategory: stringToOptionalEnum<CaseCategory>(searchOptions.caseCategory),
  murderWeapon: stringToOptionalEnum<CaseMurderWeapon>(searchOptions.murderWeapon),
  victimBondAggressor: stringToOptionalEnum<CaseVictimBondAggressor>(searchOptions.victimBondAggressor),
  victimFullName: searchOptions.victimFullName,
  aggressorFullName: searchOptions.aggressorFullName,
});

const defaultListCaseFilters = searchOptionsToListCaseFilters(defaultSearchOptions);

export default function CasesIndex() {
  const [filters, setFilters] = useState(defaultListCaseFilters);

  const searchForm = useAppForm({
    defaultValues: defaultSearchOptions,
    onSubmit: ({value}) => {
      const newFilters = searchOptionsToListCaseFilters(value);
      setFilters(newFilters);
    }
  });

  const accessToken = useAccessToken();
  const {data} = useQuery({
    queryKey: ["cases", filters],
    queryFn: () => listCases(accessToken, filters),
  });

  return (
    <Container maxWidth="lg">
      <form onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        searchForm.handleSubmit();
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <searchForm.AppField
              name='fromDate'
              children={(field) => <field.DatePicker label="Desde" clearable />} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <searchForm.AppField
              name='toDate'
              children={(field) => <field.DatePicker label="Hasta" clearable />} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <searchForm.AppField
              name='province'
              children={(field) => <field.Combo label="Provincia" options={allProvinces} />} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <searchForm.AppField
              name='location'
              children={(field) => <field.Text label="Localidad" />} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <searchForm.AppField
              name='caseCategory'
              children={(field) => <field.Combo label="Categoría" options={allCaseCategories} />} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <searchForm.AppField
              name='murderWeapon'
              children={(field) => <field.Combo label="Forma" options={allCaseMurderWeapons} />} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <searchForm.AppField
              name='victimBondAggressor'
              children={(field) => <field.Combo label="Vínculo con la víctima" options={allCaseVictimBondsAggressor} />} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <searchForm.AppField
              name='victimFullName'
              children={(field) => <field.Text label="Nombre de la víctima" />} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <searchForm.AppField
              name='aggressorFullName'
              children={(field) => <field.Text label="Nombre del agresor" />} />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={{my: 2}}>
          Buscar
        </Button>
        <Button
          type="reset"
          variant="outlined"
          sx={{m: 2}}
          onClick={(event) => {
            event.preventDefault();
            searchForm.reset();
          }}>
          Limpiar filtros
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead sx={{
            "& th": {
              fontWeight: "bold"
            }
          }}>
            <TableRow>
              <TableCell colSpan={5} />
              <TableCell colSpan={2} align='center'>Víctima</TableCell>
              <TableCell colSpan={2} align='center'>Agresor</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Fecha del caso</TableCell>
              <TableCell>Provincia</TableCell>
              <TableCell>Localidad</TableCell>
              <TableCell>Forma</TableCell>

              <TableCell>Nombre</TableCell>
              <TableCell>Edad</TableCell>

              <TableCell>Nombre</TableCell>
              <TableCell>Edad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.caseCategory}</TableCell>
                <TableCell>{dayjs(item.occurredAt).utc().format("DD-MM-YYYY")}</TableCell>
                <TableCell>{item.province}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.murderWeapon}</TableCell>
                <TableCell>{item.victim?.fullName}</TableCell>
                <TableCell>{item.victim?.age}</TableCell>
                <TableCell>{item.aggressor?.fullName}</TableCell>
                <TableCell>{item.aggressor?.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
