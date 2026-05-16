import {useFieldContext} from "@/hooks/form";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FieldHelp from "./FieldHelp";

type BoundTextProps = TextFieldProps & {helpText?: React.ReactNode};

export default function BoundText({helpText, label, ...props}: BoundTextProps) {
  const field = useFieldContext<string>();

  const endAdornment = helpText && (
    <>
      <InputAdornment position="end">
        <FieldHelp title={typeof label === "string" ? label : "Ayuda"} helpText={helpText} />
      </InputAdornment>
    </>
  );

  return (
    <TextField
      fullWidth
      {...props}
      label={label}
      slotProps={{
        input: {
          endAdornment,
        },
      }}
      error={!field.state.meta.isValid}
      helperText={field.state.meta.errors.join(", ")}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
    />
  );
}
