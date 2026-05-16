import {useFieldContext} from "@/hooks/form";
import {DatePicker} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";
import InputAdornment, {InputAdornmentProps} from "@mui/material/InputAdornment";
import {useMemo} from "react";
import FieldHelp from "./FieldHelp";

type BoundDatePickerProps = {
  label: string,
  clearable?: boolean,
  helpText?: React.ReactNode,
};

export default function BoundDatePicker({label, clearable, helpText}: BoundDatePickerProps) {
  const field = useFieldContext<Dayjs | null>();

  const inputAdornmentSlot = useMemo(() => {
    if (!helpText) return undefined;
    return function InputAdornmentWithHelp({children, ...props}: InputAdornmentProps) {
      return (
        <InputAdornment {...props}>
          <FieldHelp title={label} helpText={helpText} />
          {children}
        </InputAdornment>
      );
    };
  }, [label, helpText]);

  return (
    <DatePicker
      label={label}
      slots={inputAdornmentSlot ? {inputAdornment: inputAdornmentSlot} : undefined}
      slotProps={{
        textField: {
          fullWidth: true,
          error: !field.state.meta.isValid,
          helperText: field.state.meta.errors.join(", "),
        },
        field: {
          clearable: clearable
        },
      }}
      value={field.state.value}
      onChange={field.handleChange}
    />
  );
}
