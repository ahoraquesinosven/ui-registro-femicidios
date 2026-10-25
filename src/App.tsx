import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import Errors from '@/Errors';
import { queryClient } from '@/lib/reactQuery';
import { router } from '@/lib/reactRouter';
import { theme } from '@/lib/theme';

export default function App() {
  return (
    <React.StrictMode>
      <Errors>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </Errors>
    </React.StrictMode>
  );
}
