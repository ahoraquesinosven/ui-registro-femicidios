import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { AuthContextValue } from '@/hooks/auth';

export interface RouterContext {
  auth: AuthContextValue;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
