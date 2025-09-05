import { useFieldContext } from "@/hooks/form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export type BoundMultiComboProps = {
  options: string[],
  label: string,
}

export default function BoundMultiCombo({options, label} : BoundMultiComboProps) {
  const field = useFieldContext<string[] | undefined>();

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      renderInput={(params) => <TextField {...params} label={label} />}
      options={options}
      value={field.state.value}
      onChange={(_e: unknown, newValue: string[] | null) => {
        field.handleChange(newValue === null ? undefined : newValue)
      }}
      onBlur={field.handleBlur}
    />
  );
}


