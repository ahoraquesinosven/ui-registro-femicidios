import { createFileRoute } from "@tanstack/react-router";
import CasesIndex from "@/features/cases/CasesList";
import { parseCaseSearch } from "@/features/cases/searchFilters";

export const Route = createFileRoute("/_authenticated/cases/")({
  validateSearch: parseCaseSearch,
  head: () => ({
    meta: [{ title: "RF - Buscar casos" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <CasesIndex
      search={search}
      onSearchChange={(s) => navigate({ search: s })}
    />
  );
}
