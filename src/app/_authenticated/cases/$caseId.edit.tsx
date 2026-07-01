import { createFileRoute } from '@tanstack/react-router';
import CasesEdit from '@/routes/cases/edit';

export const Route = createFileRoute('/_authenticated/cases/$caseId/edit')({
  component: CasesEdit,
});
