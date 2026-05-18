import {useFieldContext} from "@/hooks/form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FieldHelp from "./FieldHelp";

export type BoundComboProps = {
  options: string[],
  label: string,
  required?: boolean,
  helpText?: React.ReactNode,
}

export default function BoundCombo({options, label, required, helpText}: BoundComboProps) {
  const field = useFieldContext<string | null>();

  return (
    <Autocomplete
      options={options}
      value={field.state.value}
      onChange={(_e: unknown, newValue: string | null) => field.handleChange(newValue)}
      onBlur={field.handleBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          label={label}
          error={!field.state.meta.isValid}
          helperText={field.state.meta.errors.join(", ")}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  {helpText && (
                    <InputAdornment position="end">
                      <FieldHelp title={label} helpText={helpText} />
                    </InputAdornment>
                  )}
                </>
              )
            }
          }}
        />
      )}
    />
  );
}
