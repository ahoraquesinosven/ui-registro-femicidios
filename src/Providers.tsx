import CssBaseline from "@mui/material/CssBaseline";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from 'dayjs';
import "dayjs/locale/es";
import dayjsUtc from 'dayjs/plugin/utc';
import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {AccessTokenProvider} from './hooks/auth.ts';
import {AccessToken} from "./types/auth.ts";

dayjs.extend(dayjsUtc);

type ProvidersProps = {
  children: React.ReactNode,
};

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  }
);

export default function Providers({children}: ProvidersProps) {
  return (
    <React.Fragment>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AccessTokenProvider value={new AccessToken()}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            {children}
          </LocalizationProvider>
        </AccessTokenProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
}
