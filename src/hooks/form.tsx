import BoundRadioGroup from "@/components/form/BoundRadioGroup";
import BoundTextField from "@/components/form/BoundTextField";
import BoundYesNoUnknown from "@/components/form/BoundYesNoUnknown";
import {createFormHook, createFormHookContexts} from "@tanstack/react-form";

export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField: BoundTextField,
    RadioGroup: BoundRadioGroup,
    YesNoUnknown: BoundYesNoUnknown,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
