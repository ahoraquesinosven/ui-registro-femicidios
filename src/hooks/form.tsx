import {
  type AnyFormApi,
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form";
import type { ValidationErrors } from "@/api/aqsnv/cases";
import BoundCheckbox from "@/components/form/BoundCheckBox";
import BoundCombo from "@/components/form/BoundCombo";
import BoundDatePicker from "@/components/form/BoundDatePicker";
import BoundMultiCombo from "@/components/form/BoundMultiCombo";
import BoundRadioGroup from "@/components/form/BoundRadioGroup";
import BoundText from "@/components/form/BoundText";
import BoundYesNoUnknown from "@/components/form/BoundYesNoUnknown";
import { isValidInteger, isValidNumber } from "@/utils/validations";
export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    Text: BoundText,
    RadioGroup: BoundRadioGroup,
    YesNoUnknown: BoundYesNoUnknown,
    DatePicker: BoundDatePicker,
    Checkbox: BoundCheckbox,
    Combo: BoundCombo,
    MultiCombo: BoundMultiCombo,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export function handleFormSubmit(form: AnyFormApi) {
  return (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };
}

export function setErrorMapFromValidationResponse(
  errors: ValidationErrors,
  formApi: AnyFormApi,
) {
  errors.forEach((error) => {
    const path = error.path.split("/").slice(1).join(".");

    formApi.setFieldMeta(path, (prev) => ({
      ...prev,
      errorMap: { ...prev.errorMap, onSubmit: error.message },
    }));
  });
}

export function validateDecimalField({ value }: { value: string }) {
  return !isValidNumber(value) ? "debe ser un número" : undefined;
}

export function validateIntegerField({ value }: { value: string }) {
  return !isValidInteger(value) ? "debe ser un número entero" : undefined;
}
