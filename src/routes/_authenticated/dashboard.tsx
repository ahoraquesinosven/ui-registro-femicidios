import { createFileRoute } from '@tanstack/react-router';
import Dashboard from '@/features/dashboard/Dashboard';
import { parseStatsSearch } from '@/features/cases/searchFilters';

export const Route = createFileRoute('/_authenticated/dashboard')({
  validateSearch: parseStatsSearch,
  head: () => ({
    meta: [{ title: 'RF - Estadísticas' }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return <Dashboard search={search} onSearchChange={(s) => navigate({ search: s })} />;
}
