import { useFieldContext } from "@/hooks/form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export default function BoundText(props : TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <TextField
      fullWidth
      {...props}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
    />
  );
}
