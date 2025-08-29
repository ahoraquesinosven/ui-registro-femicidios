import BoundRadioGroup, {BoundRadioGroupProps} from "./BoundRadioGroup";

export type BoundYesNoUnknownProps = Omit<BoundRadioGroupProps, "options" >;

export default function BoundYesNoUnknown(props: BoundYesNoUnknownProps) {
  return (
    <BoundRadioGroup {...props} options={[
      { value: "unknown", label: "Sin Datos" },
      { value: "yes", label: "Si" },
      { value: "no", label: "No" },
    ]} />
  );
}
