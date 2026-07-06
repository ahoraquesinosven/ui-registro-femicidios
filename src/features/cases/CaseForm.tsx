import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useStore } from "@tanstack/react-form";
import type { CaseValidationResult } from "@/api/aqsnv/cases";
import NotificationSnackBar from "@/components/NotificationSnackBar";
import TabbedSections from "@/components/TabbedSections";
import {
  handleFormSubmit,
  setErrorMapFromValidationResponse,
  useAppForm,
} from "@/hooks/form";
import { useNotifications } from "@/hooks/notifications";
import AggressorFields from "./AggressorFields";
import CaseFields from "./CaseFields";
import {
  aggressorControlledFields as aggressorSectionFields,
  caseControlledFields,
  victimControlledFields as victimSectionFields,
} from "./controlledFields";
import type { defaultFormValues } from "./formValues";
import VictimFields from "./VictimFields";

export type CaseFormProps = {
  defaultValues: typeof defaultFormValues;
  onSubmit: (value: typeof defaultFormValues) => Promise<CaseValidationResult>;
  reset?: boolean;
};

export default function CaseForm({
  defaultValues,
  onSubmit,
  reset,
}: CaseFormProps) {
  const notification = useNotifications();

  const form = useAppForm({
    defaultValues: defaultValues,
    onSubmit: async ({ value, formApi }) => {
      const result = await onSubmit(value);

      if (!result.ok) {
        setErrorMapFromValidationResponse(result.errors, formApi);
        notification.show({
          message: "No se puede cargar el caso porque hay errores de carga",
          severity: "error",
        });
        return;
      }

      notification.show({
        message: "El caso fue guardado exitosamente",
        severity: "success",
      });

      if (reset) {
        formApi.reset();
      }
    },
  });

  const fieldsWithErrors = useStore(form.store, (state) =>
    Object.entries(state.fieldMeta)
      .filter(([, meta]) => meta && !meta.isValid)
      .map(([field]) => field),
  );

  return (
    <Container maxWidth="md">
      <form onSubmit={handleFormSubmit(form)} noValidate>
        <TabbedSections
          tabProps={{
            variant: "fullWidth",
            centered: true,
          }}
          boxProps={{
            sx: { py: 2 },
          }}
          sections={[
            {
              key: "case",
              label: "Información del Caso",
              component: <CaseFields form={form} />,
              hasError: fieldsWithErrors.some((field) =>
                caseControlledFields.has(field),
              ),
            },
            {
              key: "victim",
              label: "Víctima",
              component: <VictimFields form={form} />,
              hasError: fieldsWithErrors.some((field) =>
                victimSectionFields.has(field),
              ),
            },
            {
              key: "aggressor",
              label: "Agresor",
              component: <AggressorFields form={form} />,
              hasError: fieldsWithErrors.some((field) =>
                aggressorSectionFields.has(field),
              ),
            },
          ]}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!canSubmit}
            >
              {isSubmitting ? "Guardando" : "Guardar"}
            </Button>
          )}
        />
      </form>
      <NotificationSnackBar
        currentNotification={notification.current}
        closeNotification={notification.close}
      />
    </Container>
  );
}
