import { useFieldContext } from "@/hooks/form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export type BoundComboProps = {
  options: string[],
  label: string
}

export default function BoundCombo({options, label} : BoundComboProps) {
  const field = useFieldContext<string | null>();

  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label={label} />}
      options={options}
      value={field.state.value}
      onChange={(_e: unknown, newValue: string | null) => field.handleChange(newValue)}
      onBlur={field.handleBlur}
    />
  );
}

