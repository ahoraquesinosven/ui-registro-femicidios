import { createRootRouteWithContext, HeadContent, Outlet } from '@tanstack/react-router';
import type { AuthContextValue } from '@/hooks/auth';

export interface RouterContext {
  auth: AuthContextValue;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [{ title: 'Registro de Femicidios' }],
  }),
  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
});
