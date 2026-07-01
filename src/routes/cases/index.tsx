import { CaseCategory, CaseMurderWeapon, CaseVictimBondAggressor, ListCaseFilters, listCases, Province } from '@/api/aqsnv/cases';
import { useAccessToken } from "@/hooks/auth";
import { useAppForm } from '@/hooks/form';
import { stringToOptionalEnum, YesNoUnknown, yesNoUnknownToBoolean } from '@/utils/cast';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import dayjs, { Dayjs } from 'dayjs';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { BlockLoader } from '@/components/Loading';
import { allCaseCategories, allCaseMurderWeapons, allCaseVictimBondsAggressor, allProvinces } from './formValues';
import useDocumentTitle from '@/hooks/documentTitle';

//es mas que solo el default del formulario, tambien como usamos typyscript se usa para inferir el tipo
const defaultSearchOptions = {
  fromDate: dayjs().startOf("year"),
  toDate: null as Dayjs | null,
  province: null as string | null,
  location: "",
  caseCategory: null as string | null,
  wasItAnAttempt: "unknown" as YesNoUnknown,
  murderWeapon: null as string | null,
  victimBondAggressor: null as string | null,
  victimFullName: "",
  aggressorFullName: "",
};

const searchOptionsToListCaseFilters = (searchOptions: typeof defaultSearchOptions): ListCaseFilters => ({
  fromDate: searchOptions.fromDate?.format("YYYY-MM-DD"),
  toDate: searchOptions.toDate?.format("YYYY-MM-DD"),
  province: stringToOptionalEnum<Province>(searchOptions.province),
  location: searchOptions.location.trim(),
  caseCategory: stringToOptionalEnum<CaseCategory>(searchOptions.caseCategory),
  wasItAnAttempt: yesNoUnknownToBoolean(searchOptions.wasItAnAttempt),
  murderWeapon: stringToOptionalEnum<CaseMurderWeapon>(searchOptions.murderWeapon),
  victimBondAggressor: stringToOptionalEnum<CaseVictimBondAggressor>(searchOptions.victimBondAggressor),
  victimFullName: searchOptions.victimFullName.trim(),
  aggressorFullName: searchOptions.aggressorFullName.trim(),
});

const defaultListCaseFilters = searchOptionsToListCaseFilters(defaultSearchOptions);

export default function CasesIndex() {
  useDocumentTitle("Buscar casos");

  const [filters, setFilters] = useState(defaultListCaseFilters);

  const searchForm = useAppForm({
    defaultValues: defaultSearchOptions,
    onSubmit: ({ value }) => {
      const newFilters = searchOptionsToListCaseFilters(value);
      setFilters(newFilters);
    }
  });

  const accessToken = useAccessToken();
  const query = useInfiniteQuery({
    queryKey: ["cases", filters],
    queryFn: ({ pageParam }) => listCases(accessToken, filters, 100, pageParam),
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  });

  const { hasNextPage, isFetching, fetchNextPage } = query;
  const totalCount = query.data?.pages[0]?.total ?? 0;
  const scrollRootRef = useRef(null);
  const observerTarget = useRef(null);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) {
      return;
    }

    // Measure against the scrollable table container (not the viewport) so the
    // sentinel triggers when the user reaches the bottom of the internally
    // scrolled table, regardless of where the container sits on the page.
    // Re-observing on state change re-fires if the sentinel is still visible
    // after a page loads.
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      { root: scrollRootRef.current },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetching, fetchNextPage]);

  return (
    <Container maxWidth="xl">
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

          <Grid item xs={12} sm={3}>
            <searchForm.AppField
              name='caseCategory'
              children={(field) => <field.Combo label="Categoría" options={allCaseCategories} />} />
          </Grid>

          <Grid item xs={12} sm={3}>
            <searchForm.AppField
              name='wasItAnAttempt'
              children={(field) => <field.YesNoUnknown label="¿Fue un intento?" />} />
          </Grid>


          <Grid item xs={12} sm={3}>
            <searchForm.AppField
              name='murderWeapon'
              children={(field) => <field.Combo label="Forma" options={allCaseMurderWeapons} />} />
          </Grid>
          <Grid item xs={12} sm={3}>
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

        <Button type="submit" variant="contained" color="primary" sx={{ my: 2 }}>
          Buscar
        </Button>
        <Button
          type="reset"
          variant="outlined"
          sx={{ m: 2 }}
          onClick={(event) => {
            event.preventDefault();
            searchForm.reset();
          }}>
          Limpiar filtros
        </Button>
      </form>

      <Paper sx={{ mt: 2 }}>
        <TableContainer ref={scrollRootRef} sx={{ maxHeight: '55vh' }}>
          <Table size="small" stickyHeader>
            <TableHead sx={{
              "& th": {
                fontWeight: "bold"
              }
            }}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Fue un intento</TableCell>
                <TableCell>Fecha del caso</TableCell>
                <TableCell>Provincia</TableCell>
                <TableCell>Localidad</TableCell>
                <TableCell>Forma</TableCell>
                <TableCell>Nombre víctima</TableCell>
                <TableCell>Edad víctima</TableCell>
                <TableCell>Nombre agresor</TableCell>
                <TableCell>Edad agresor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {query.data?.pages.map((page, i) => (
                <Fragment key={i}>
                  {page.page.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <IconButton component={Link} to={`/cases/${item.id}/edit`}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>{item.caseCategory}</TableCell>
                      <TableCell>{item.wasItAnAttempt ? "Sí" : "No"}</TableCell>
                      <TableCell>{dayjs(item.occurredAt).utc().format("DD-MM-YYYY")}</TableCell>
                      <TableCell>{item.province}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.murderWeapon}</TableCell>
                      <TableCell>{item.victim?.fullName}</TableCell>
                      <TableCell>{(item.victim && item.victim.age) ? (item.victim.age * 1).toString() : undefined}</TableCell>
                      <TableCell>{item.aggressor?.fullName}</TableCell>
                      <TableCell>{item.aggressor?.age}</TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
          {/* Sentinel for infinite scroll. Needs real height (not 1px): at the
              very bottom of the scroll container the last sub-pixel can't be
              reached, so a 1px target's intersection ratio rounds to 0 and the
              observer never fires. */}
          <Box ref={observerTarget} sx={{ height: 10 }} />
          {query.isFetching && (
            <BlockLoader />
          )}
        </TableContainer>
        <Toolbar variant="dense" sx={{ justifyContent: 'flex-end', borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" component="div">
            Total de Casos: {totalCount}
          </Typography>
        </Toolbar>
      </Paper>
    </Container>
  );
}
