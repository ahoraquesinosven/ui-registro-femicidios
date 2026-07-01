import CssBaseline from "@mui/material/CssBaseline";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from 'dayjs';
import "dayjs/locale/es";
import dayjsUtc from 'dayjs/plugin/utc';
import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthContextProvider, useAuthProviderValue} from './hooks/auth.ts';

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
  const auth = useAuthProviderValue();
  return (
    <React.Fragment>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider value={auth}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            {children}
          </LocalizationProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
}
