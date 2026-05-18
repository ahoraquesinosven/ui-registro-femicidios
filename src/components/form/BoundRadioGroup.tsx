import { useFieldContext } from "@/hooks/form";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FieldHelp from "./FieldHelp";

export type BoundRadioGroupProps = {
  label: string,
  options: {value: string, label: string}[],
  helpText?: React.ReactNode,
};

export default function BoundRadioGroup({label, options, helpText} : BoundRadioGroupProps) {
  const field = useFieldContext<string>();

  return (
    <FormControl>
      <FormLabel>
        {label}
        {helpText && <FieldHelp title={label} helpText={helpText} />}
      </FormLabel>
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
