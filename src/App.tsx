import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import Errors from "@/Errors";
import { queryClient } from "@/lib/reactQuery";
import { router } from "@/lib/reactRouter";

export default function App() {
  return (
    <React.StrictMode>
      <Errors>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </LocalizationProvider>
      </Errors>
    </React.StrictMode>
  );
}
