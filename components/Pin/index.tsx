import { useMemo } from "react";

import PinInput from "../PinInput";

export type Props = {
  value: string;
  length: number;
  regex: any;
  isSecret: boolean;
  onChange: (value: string) => void;
};

const Pin = ({ value, length, regex, isSecret, onChange }: Props) => {
  const checkRegex = (char: any) => {
    if (regex !== "") {
      return regex.test(char) ? char : "";
    }

    return char;
  };

  const valueItems = useMemo(() => {
    const valueArray = value.split("");

    const items: Array<string> = [];
    for (let i = 0; i < length; i++) {
      const char = valueArray[i];
      items.push(checkRegex(char));
    }

    return items;
  }, [value, length, regex]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const target = e.target;
    let inputValue = target.value;

    if (regex && !regex.test(inputValue) && inputValue !== "") {
      return;
    }

    if (regex) {
      inputValue = regex.test(inputValue) ? inputValue : " ";
    }

    const inputValueLength = inputValue.length;

    if (inputValueLength === 1) {
      const valueItemsTmp = [...valueItems];

      valueItemsTmp[index] = inputValue;

      onChange(valueItemsTmp.join(""));

      if (regex && !regex.test(inputValue)) {
        return;
      }

      focusToNextInput(target);
    } else if (inputValueLength >= length) {
      // Pasting
      onChange(inputValue);
      target.blur();
    }
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    focusToPrevInput(target);
  };

  return (
    <div className="pin-content">
      {Array.from(Array(length || 4).keys()).map((item, index) => (
        <PinInput
          key={item.toString()}
          index={index}
          digit={valueItems?.[index] || ""}
          isSecret={isSecret}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
};

export default Pin;
