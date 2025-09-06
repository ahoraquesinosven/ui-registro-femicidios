import { useFieldContext } from "@/hooks/form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export type BoundComboProps = {
  options: string[],
  label: string,
}

export default function BoundCombo({options, label} : BoundComboProps) {
  const field = useFieldContext<string | null>();

  return (
    <Autocomplete
      options={options}
      value={field.state.value}
      onChange={(_e: unknown, newValue: string | null) => field.handleChange(newValue)}
      onBlur={field.handleBlur}
      renderInput={(params) => (
        <TextField {...params}  
          label={label}
          error={!field.state.meta.isValid}
          helperText={field.state.meta.errors.join(", ")} />
      )}
    />
  );
}

