import { useEffect, useRef } from "react";

export type Props = {
  index: number;
  digit: string;
  isSecret: boolean;
  onChange: (value: any) => void;
  onKeyDown: (value: any) => void;
  onFocus: (value: any) => void;
};

const PinInput = ({
  index,
  digit,
  isSecret,
  onChange,
  onKeyDown,
  onFocus,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (index === 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [index]);

  return (
    <input
      ref={inputRef}
      type={isSecret ? "password" : "text"}
      className="pin-input"
      value={digit}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    />
  );
};

export default PinInput;
