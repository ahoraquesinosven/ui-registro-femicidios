import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {AccessTokenProvider} from './hooks/auth.ts';
import {AccessToken} from "./types/auth.ts";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";

type ProvidersProps = {
  children: React.ReactNode,
};

const queryClient = new QueryClient();

export default function Providers({children}: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessTokenProvider value={new AccessToken()}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          {children}
        </LocalizationProvider>
      </AccessTokenProvider>
    </QueryClientProvider>
  );
}
