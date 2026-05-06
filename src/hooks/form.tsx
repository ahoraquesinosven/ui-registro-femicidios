import BoundRadioGroup from "@/components/form/BoundRadioGroup";
import BoundText from "@/components/form/BoundText";
import BoundYesNoUnknown from "@/components/form/BoundYesNoUnknown";
import BoundDatePicker from "@/components/form/BoundDatePicker";
import BoundCheckbox from "@/components/form/BoundCheckBox";
import BoundCombo from "@/components/form/BoundCombo";
import BoundMultiCombo from "@/components/form/BoundMultiCombo";
import {createFormHook, createFormHookContexts} from "@tanstack/react-form";
import { AnyFormApi } from "@tanstack/react-form";
import { ValidationErrors } from "@/api/aqsnv/cases";
export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts();

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
  }
}

export function setErrorMapFromValidationResponse(errors: ValidationErrors, formApi: AnyFormApi) {
  errors.forEach((error) => {
    const path = error.path.split("/").slice(1).join(".");
    const fieldInfo = formApi.fieldInfo[path];

    fieldInfo?.instance?.setErrorMap({onSubmit: error.message});
  });
}
