import { createFileRoute } from '@tanstack/react-router';
import CasesEdit from '@/features/cases/CaseEdit';

export const Route = createFileRoute('/_authenticated/cases/$caseId/edit')({
  head: () => ({
    meta: [{ title: 'Femicidios - Editar caso' }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { caseId } = Route.useParams();
  return <CasesEdit caseId={caseId} />;
}
