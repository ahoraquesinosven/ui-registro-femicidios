import {useQuery} from 'react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";
import {useAccessToken} from "@/hooks/auth";
import {listCases, ListCaseFilters} from '@/api/aqsnv/cases';

const CasesIndex = () => {
  const accessToken = useAccessToken();

  const filters: ListCaseFilters = {};

  const {data} = useQuery({
    queryKey: ["cases", filters],
    queryFn: () => listCases(accessToken, filters),
  });

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Provincia</TableCell>
              <TableCell>Localidad</TableCell>
              <TableCell>Forma</TableCell>
              <TableCell>Victima</TableCell>
              <TableCell>Agresor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.caseCategory}</TableCell>
                <TableCell>{item.occurredAt}</TableCell>
                <TableCell>{item.province}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.murderWeapon}</TableCell>
                <TableCell>{item.victim.fullName}{item.victim.age ? ` - ${item.victim.age} años` : ""}</TableCell>
                <TableCell>{item.aggressor.fullName}{item.aggressor.age ? ` - ${item.aggressor.age} años` : ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CasesIndex;

