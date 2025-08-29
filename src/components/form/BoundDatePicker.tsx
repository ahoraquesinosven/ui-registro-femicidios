import {useFieldContext} from "@/hooks/form";
import {DatePicker} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";

type BoundDatePickerProps = {
  label: string
};

export default function BoundDatePicker({label}: BoundDatePickerProps) {
  const field = useFieldContext<Dayjs>();

  const handleChange = (value: Dayjs | null) => {
    if (value !== null) {
      field.handleChange(value);
    }
  }

  return (
    <DatePicker
      label={label}
      slotProps={{
        textField: {fullWidth: true},
      }}
      value={field.state.value}
      onChange={handleChange}
    />
  );
}

