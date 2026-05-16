import { useFieldContext } from "@/hooks/form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox, {CheckboxProps} from "@mui/material/Checkbox";
import FieldHelp from "./FieldHelp";

export type BoundCheckboxProps = {
  label: string,
  disabled?: boolean,
  checkbox?: CheckboxProps,
  helpText?: React.ReactNode,
};

export default function BoundCheckbox({label, checkbox, disabled, helpText} : BoundCheckboxProps) {
  const field = useFieldContext<boolean>();

  const labelNode = helpText ? (
    <>
      {label}
      <FieldHelp title={label} helpText={helpText} />
    </>
  ) : label;

  return (
    <FormControlLabel
      label={labelNode}
      disabled={disabled}
      control={
        <Checkbox
          {...checkbox}
          checked={field.state.value}
          onChange={(e) => field.handleChange(e.target.checked)}
          onBlur={field.handleBlur}
        />
      }
    />
  );
}
