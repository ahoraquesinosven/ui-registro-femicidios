import { createFileRoute, redirect } from '@tanstack/react-router';
import localforage from 'localforage';
import { generatePKCEPair, buildAuthorizationUrl } from '@/api/aqsnv/auth';
import Layout from '@/routes/Layout';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.token.isAvailable()) {
      const pkce = await generatePKCEPair();
      await localforage.setItem('pkce', pkce.verifier);
      const authorizationUrl = await buildAuthorizationUrl(location.pathname, pkce);
      throw redirect({ href: authorizationUrl.toString(), replace: true });
    }
  },
  component: Layout,
});
