import { CaseStats, CaseStatsFilters, getCaseStats } from '@/api/aqsnv/cases';
import { useAppForm } from '@/hooks/form';
import Alert from '@mui/material/Alert';
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
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { BlockLoader } from '@/components/Loading';
import CaseFilterFields from '@/features/cases/CaseFilterFields';
import { defaultSearchOptions, searchOptionsToFilters, filtersToSearchOptions, toStatsFilters } from '@/features/cases/searchFilters';
import CountTable from './CountTable';
import { categoryAttemptRows, formatPercent, yesNoUnknownRows } from './stats';

type DashboardProps = {
  search: CaseStatsFilters,
  onSearchChange: (search: CaseStatsFilters) => void,
};

function TotalCard({ total }: { total: number }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        Total de casos
      </Typography>
      <Typography variant="h3" component="div">
        {total}
      </Typography>
    </Paper>
  );
}

function CategoryAttemptTable({ stats }: { stats: CaseStats }) {
  const rows = categoryAttemptRows(stats.byCategoryAndAttempt);

  return (
    <Paper>
      <Typography variant="h6" sx={{ px: 2, pt: 2 }}>
        Por categoría e intento
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ "& th": { fontWeight: "bold" } }}>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell align="right">Consumado</TableCell>
              <TableCell align="right">Intento</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.caseCategory} hover>
                <TableCell>{row.caseCategory}</TableCell>
                <TableCell align="right">{row.completed}</TableCell>
                <TableCell align="right">{row.attempt}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                <TableCell align="right">{formatPercent(row.total, stats.total)}</TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ "& td": { fontWeight: "bold" } }}>
              <TableCell>Total</TableCell>
              <TableCell align="right">{rows.reduce((sum, row) => sum + row.completed, 0)}</TableCell>
              <TableCell align="right">{rows.reduce((sum, row) => sum + row.attempt, 0)}</TableCell>
              <TableCell align="right">{stats.total}</TableCell>
              <TableCell align="right">{formatPercent(stats.total, stats.total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

function StatsTables({ stats }: { stats: CaseStats }) {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TotalCard total={stats.total} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CategoryAttemptTable stats={stats} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CountTable
          title="Por provincia"
          total={stats.total}
          rows={stats.byProvince.map((item) => ({ label: item.province, count: item.count }))} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CountTable
          title="Por forma"
          total={stats.total}
          rows={stats.byMurderWeapon.map((item) => ({ label: item.murderWeapon, count: item.count }))} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CountTable
          title="Por vínculo con el agresor"
          total={stats.total}
          rows={stats.byVictimBondAggressor.map((item) => ({ label: item.victimBondAggressor, count: item.count }))} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CountTable
          title="¿Víctima embarazada?"
          total={stats.total}
          sorted={false}
          rows={yesNoUnknownRows(stats.victimIsPregnant)} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CountTable
          title="¿Agresor pertenece a fuerza de seguridad?"
          total={stats.total}
          sorted={false}
          rows={yesNoUnknownRows(stats.aggressorBelongsSecurityForce)} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CountTable
          title="Por fuerza de seguridad"
          total={stats.total}
          rows={stats.bySecurityForce.map((item) => ({ label: item.securityForce, count: item.count }))} />
      </Grid>
    </Grid>
  );
}

export default function Dashboard({ search, onSearchChange }: DashboardProps) {
  const searchForm = useAppForm({
    defaultValues: filtersToSearchOptions(search),
    onSubmit: ({ value }) => {
      onSearchChange(toStatsFilters(searchOptionsToFilters(value)));
    }
  });

  const query = useQuery({
    queryKey: ["caseStats", search],
    queryFn: () => getCaseStats(search),
  });

  return (
    <Container maxWidth="xl">
      <form onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        searchForm.handleSubmit();
      }}>
        <CaseFilterFields form={searchForm} showNames={false} />

        <Button type="submit" variant="contained" color="primary" sx={{ my: 2 }}>
          Buscar
        </Button>
        <Button
          type="reset"
          variant="outlined"
          sx={{ m: 2 }}
          onClick={(event) => {
            event.preventDefault();
            searchForm.reset(defaultSearchOptions);
            onSearchChange({});
          }}>
          Limpiar filtros
        </Button>
      </form>

      {query.isPending && <BlockLoader />}
      {query.isError && (
        <Alert severity="error">No se pudieron cargar las estadísticas.</Alert>
      )}
      {query.data && <StatsTables stats={query.data} />}
    </Container>
  );
}
