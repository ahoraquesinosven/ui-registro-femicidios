import { createRouter } from '@tanstack/react-router';
import type { AuthContextValue } from '@/hooks/auth';
import { routeTree } from '@/routeTree.gen';

export const router = createRouter({
  routeTree,
  context: {
    // Real value injected when <RouterProvider> mounts in App.
    auth: undefined! as AuthContextValue,
  },
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
