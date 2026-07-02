import { createFileRoute } from '@tanstack/react-router';
import CasesIndex from '@/features/cases/CasesList';

export const Route = createFileRoute('/_authenticated/cases/')({
  head: () => ({
    meta: [{ title: 'Femicidios - Buscar casos' }],
  }),
  component: CasesIndex,
});
