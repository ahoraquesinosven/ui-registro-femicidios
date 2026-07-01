import { createFileRoute } from '@tanstack/react-router';
import CasesIndex from '@/routes/cases';

export const Route = createFileRoute('/_authenticated/cases/')({
  component: CasesIndex,
});
