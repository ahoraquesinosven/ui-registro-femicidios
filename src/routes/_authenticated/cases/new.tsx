import { createFileRoute } from "@tanstack/react-router";
import CasesNew from "@/features/cases/CaseNew";

export const Route = createFileRoute("/_authenticated/cases/new")({
  head: () => ({
    meta: [{ title: "RF - Crear caso" }],
  }),
  component: CasesNew,
});
