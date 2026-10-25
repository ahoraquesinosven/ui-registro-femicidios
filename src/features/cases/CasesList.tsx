import { ListCaseFilters, listCases } from '@/api/aqsnv/cases';
import { useAppForm } from '@/hooks/form';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from '@/lib/dayjs';
import { Fragment, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IconButtonLink } from '@/components/links';
import { BlockLoader } from '@/components/Loading';
import CaseFilterFields from './CaseFilterFields';
import { defaultSearchOptions, searchOptionsToFilters, filtersToSearchOptions } from './searchFilters';

type CasesListProps = {
  search: ListCaseFilters,
  onSearchChange: (search: ListCaseFilters) => void,
};

export default function CasesIndex({ search, onSearchChange }: CasesListProps) {
  const searchForm = useAppForm({
    defaultValues: filtersToSearchOptions(search),
    onSubmit: ({ value }) => {
      onSearchChange(searchOptionsToFilters(value));
    }
  });

  const query = useInfiniteQuery({
    queryKey: ["cases", search],
    queryFn: ({ pageParam }) => listCases(search, 100, pageParam),
    initialPageParam: undefined as string | undefined,
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
        <CaseFilterFields form={searchForm} showNames />

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
                        <IconButtonLink to="/cases/$caseId/edit" params={{ caseId: String(item.id) }}>
                          <EditIcon />
                        </IconButtonLink>
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
