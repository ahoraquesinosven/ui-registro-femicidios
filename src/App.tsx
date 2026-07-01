import { RouterProvider, createRouter } from '@tanstack/react-router';
import { useAuth, type AuthContextValue } from '@/hooks/auth';
import { routeTree } from '@/routeTree.gen';

const router = createRouter({
  routeTree,
  context: {
    // Real value injected per-render by App below.
    auth: undefined! as AuthContextValue,
  },
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
