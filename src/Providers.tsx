import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {AccessTokenProvider} from './hooks/auth.ts';
import { AccessToken } from "./types/auth.ts";

type ProvidersProps = {
  children: React.ReactNode,
};

const queryClient = new QueryClient();

export default function Providers({children}: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessTokenProvider value={new AccessToken()}>
        {children}
      </AccessTokenProvider>
    </QueryClientProvider>
  );
}
