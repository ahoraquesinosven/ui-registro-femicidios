import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StatsCard from './StatsCard';
import { CountRow, NO_DATA_LABEL, formatPercent } from './stats';

type CountTableProps = {
  title: string,
  rows: CountRow[],
  total: number,
  // Rows come sorted by count (desc) unless the order itself is meaningful (Sí / No / Sin dato).
  sorted?: boolean,
};

export default function CountTable({ title, rows, total, sorted = true }: CountTableProps) {
  const displayRows = sorted ? [...rows].sort((a, b) => b.count - a.count) : rows;

  return (
    <StatsCard title={title}>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ "& th": { fontWeight: "bold" } }}>
            <TableRow>
              <TableCell>Valor</TableCell>
              <TableCell align="right">Casos</TableCell>
              <TableCell align="right">%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>No hay casos</TableCell>
              </TableRow>
            )}
            {displayRows.map((row) => (
              <TableRow key={row.label ?? NO_DATA_LABEL} hover>
                <TableCell>{row.label ?? NO_DATA_LABEL}</TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right">{formatPercent(row.count, total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StatsCard>
  );
}
