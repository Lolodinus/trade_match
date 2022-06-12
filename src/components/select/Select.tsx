import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

// Styles
import styles from "./Select.module.scss";

// Types
interface ISelectProps {
  name?: string;
  options: string[];
  placeHolder?: string;
  setSelectedOption: (value: string | undefined) => void;
  selectedOption: string | undefined;
  setError: (message: string) => void;
  clearErrors: () => void;
  option?: {
    required?: boolean;
  };
}

const Select = (props: ISelectProps) => {
  const {
    options,
    name,
    placeHolder,
    setSelectedOption,
    selectedOption,
    setError,
    clearErrors,
    option
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [optionCursorPosition, setOptionCursorPosition] = useState<
    number | undefined
  >();
  const selectRef = useRef<HTMLDivElement | null>(null);
  const selectButtonRef = useRef<HTMLButtonElement | null>(null);

  // Select handler
  const onClickSelectHandler = () => {
    setIsOpen(!isOpen);
  };

  const keyDownSelectHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      return;
    }
    selectButtonRef.current?.focus();
    let currentSelectCursorPosition = optionCursorPosition
      ? optionCursorPosition
      : 0;
    const lastSelectCursorPosition = options.length - 1;
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        currentSelectCursorPosition =
          currentSelectCursorPosition === lastSelectCursorPosition ||
          optionCursorPosition === undefined
            ? 0
            : currentSelectCursorPosition + 1;
        setOptionCursorPosition(currentSelectCursorPosition);
        return;
      }
      case "ArrowUp": {
        e.preventDefault();
        currentSelectCursorPosition =
          currentSelectCursorPosition === 0
            ? lastSelectCursorPosition
            : currentSelectCursorPosition - 1;
        setOptionCursorPosition(currentSelectCursorPosition);
        return;
      }
      case "Escape": {
        setIsOpen(false);
        return;
      }
      case "Enter": {
        e.preventDefault();
        setSelectedOption(options[currentSelectCursorPosition]);
        return;
      }
      default: {
        return;
      }
    }
  };

  const onBlurSelectHandler = () => {
    if (isOpen) return;
    if (option?.required && !selectedOption) setError("Field Required");
  };

  useClickOutside(selectRef, () => {
    setIsOpen(false);
  });

  // Option handler
  const onClickOptionHandler = (e: React.MouseEvent, option: string) => {
    e.preventDefault();
    selectButtonRef.current?.focus();
    if (!selectedOption || selectedOption !== option) {
      setSelectedOption(option);
    }
  };

  // reset options cursor
  useEffect(() => {
    if (isOpen) return;
    setOptionCursorPosition(undefined);
  }, [isOpen]);

  useEffect(() => {
    if (!options) return;
    if (selectedOption) clearErrors();
  }, [selectedOption]);

  const getOptions = (options: string[]) => {
    return options.map((option, index) => {
      const itemStyles = `${styles.select__item}${
        selectedOption === option ? " " + styles.selected : ""
      }${optionCursorPosition === index ? " " + styles.cursor : ""}`;
      return (
        <li
          className={itemStyles}
          key={index}
          onClick={(e) => onClickOptionHandler(e, option)}
          onMouseEnter={() => setOptionCursorPosition(index)}
          onMouseLeave={() => setOptionCursorPosition(undefined)}
        >
          {option}
        </li>
      );
    });
  };

  return (
    <div
      className={styles.select}
      onKeyDown={keyDownSelectHandler}
      ref={selectRef}
      onBlur={onBlurSelectHandler}
    >
      <select style={{ display: "none" }} name={name}></select>
      <div className={styles.select__wrapper}>
        <button
          className={`${styles.select__button}${
            isOpen ? " " + styles.open : ""
          }`}
          type="button"
          onClick={onClickSelectHandler}
          ref={selectButtonRef}
        >
          {selectedOption ? selectedOption : placeHolder || "Select options"}
        </button>
        <ul
          className={
            isOpen
              ? `${styles.select__list} ${styles.show}`
              : styles.select__list
          }
        >
          {getOptions(options)}
        </ul>
      </div>
    </div>
  );
};

export default Select;
