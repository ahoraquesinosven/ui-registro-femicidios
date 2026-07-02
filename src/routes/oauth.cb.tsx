import { createFileRoute, redirect } from '@tanstack/react-router';
import localforage from 'localforage';
import { exchangeAuthorizationCode } from '@/api/aqsnv/auth';

interface OAuthCallbackSearch {
  code: string;
  state: string;
}

export const Route = createFileRoute('/oauth/cb')({
  validateSearch: (search: Record<string, unknown>): OAuthCallbackSearch => ({
    code: typeof search.code === 'string' ? search.code : '',
    state: typeof search.state === 'string' ? search.state : '/',
  }),
  beforeLoad: async ({ context, search }) => {
    const verifier = (await localforage.getItem<string>('pkce')) || '';
    const response = await exchangeAuthorizationCode(search.code, verifier);
    context.auth.login(response.access_token);
    throw redirect({ to: search.state });
  },
});
