import { useFieldContext } from "@/hooks/form";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export type BoundRadioGroupProps = {
  label: string,
  options: {value: string, label: string}[],
};

export default function BoundRadioGroup({label, options} : BoundRadioGroupProps) {
  const field = useFieldContext<string>();

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}>

        {options.map((option, index) => (
          <FormControlLabel {...option} key={index} control={<Radio />} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
