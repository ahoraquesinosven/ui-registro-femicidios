import { ReactNode } from "react";
import { InlineLoader } from '@/components/Loading';

type MutatingButtonProps = {
  disabled: boolean,
  onClick: () => void,
  className: string,
  children: ReactNode,
};

export default function MutatingButton(props : MutatingButtonProps) {
  return (
    <button
      className={props.className}
      disabled={props.disabled}
      onClick={props.onClick}>
      { props.disabled ? <InlineLoader /> : props.children }
    </button>
  );
}

