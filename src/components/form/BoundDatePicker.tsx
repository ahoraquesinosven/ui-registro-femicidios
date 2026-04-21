import {useFieldContext} from "@/hooks/form";
import {DatePicker} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";

type BoundDatePickerProps = {
  label: string
  clearable?: boolean
};

export default function BoundDatePicker(props: BoundDatePickerProps) {
  const field = useFieldContext<Dayjs | null>();

  return (
    <DatePicker
      label={props.label}
      slotProps={{
        textField: {
          fullWidth: true,
          error: !field.state.meta.isValid,
          helperText: field.state.meta.errors.join(", ")
        },
        field: {
          clearable: props.clearable
        },
      }}
      value={field.state.value}
      onChange={field.handleChange}
    />
  );
}

