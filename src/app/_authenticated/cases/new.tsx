import { createFileRoute } from '@tanstack/react-router';
import CasesNew from '@/routes/cases/new';

export const Route = createFileRoute('/_authenticated/cases/new')({
  component: CasesNew,
});
