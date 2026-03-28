import { useFieldContext } from "@/hooks/form";
import  FormControlLabel  from "@mui/material/FormControlLabel";
import  Checkbox, {CheckboxProps}  from "@mui/material/Checkbox";

export type BoundCheckboxProps = {
  label: string,
  disabled: boolean,
  checkbox?: CheckboxProps,
};

export default function BoundCheckbox({label, checkbox, disabled} : BoundCheckboxProps) {
  const field = useFieldContext<boolean>();


  return (
    <FormControlLabel
      label={label}
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

