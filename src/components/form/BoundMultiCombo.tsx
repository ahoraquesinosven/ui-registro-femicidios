import {useFieldContext} from "@/hooks/form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FieldHelp from "./FieldHelp";

export type BoundMultiComboProps = {
  options: string[],
  label: string,
  helpText?: React.ReactNode,
}

export default function BoundMultiCombo({options, label, helpText}: BoundMultiComboProps) {
  const field = useFieldContext<string[] | undefined>();

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={options}
      value={field.state.value}
      onChange={(_e: unknown, newValue: string[] | null) => {
        field.handleChange(newValue === null ? undefined : newValue)
      }}
      onBlur={field.handleBlur}
      renderInput={(params) => (
        <TextField
          {...params}
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
              ),
            }
          }}
        />
      )}
    />
  );
}
