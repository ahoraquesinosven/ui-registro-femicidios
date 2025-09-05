import BoundRadioGroup from "@/components/form/BoundRadioGroup";
import BoundText from "@/components/form/BoundText";
import BoundYesNoUnknown from "@/components/form/BoundYesNoUnknown";
import BoundDatePicker from "@/components/form/BoundDatePicker";
import BoundCheckbox from "@/components/form/BoundCheckBox";
import BoundCombo from "@/components/form/BoundCombo";
import {createFormHook, createFormHookContexts} from "@tanstack/react-form";

export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    Text: BoundText,
    RadioGroup: BoundRadioGroup,
    YesNoUnknown: BoundYesNoUnknown,
    DatePicker: BoundDatePicker,
    Checkbox: BoundCheckbox,
    Combo: BoundCombo,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
