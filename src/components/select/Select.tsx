import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

// Styles
import styles from "./Select.module.scss";

// Types
import IOption from "../../interface/select";

interface ISelectProps {
  options: IOption[];
  placeHolder?: string;
  setOption: Function;
}

const Select = (props: ISelectProps) => {
  const { options, placeHolder, setOption } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption>();
  const [selectCursorPosition, setSelectCursorPosition] = useState<
    number | undefined
  >();
  const selectRef = useRef<HTMLDivElement | null>(null);
  const selectButtonRef = useRef<HTMLButtonElement | null>(null);
  useClickOutside(selectRef, () => {
    setIsOpen(false);
  });
  // useEffect(() => {
  //   setOption(selectedOption);
  // }, [selectedOption]);

  useEffect(() => {
    if (!isOpen) {
      setSelectCursorPosition(undefined);
    }
  }, [isOpen]);

  const selectKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      return;
    }
    selectButtonRef.current?.focus();
    let currentSelectCursorPosition = selectCursorPosition
      ? selectCursorPosition
      : 0;
    const lastSelectCursorPosition = options.length - 1;
    switch (e.key) {
      case "ArrowDown": {
        console.log(!selectCursorPosition, selectCursorPosition);
        currentSelectCursorPosition =
          currentSelectCursorPosition === lastSelectCursorPosition ||
          selectCursorPosition === undefined
            ? 0
            : currentSelectCursorPosition + 1;
        setSelectCursorPosition(currentSelectCursorPosition);
        return;
      }
      case "ArrowUp": {
        currentSelectCursorPosition =
          currentSelectCursorPosition === 0
            ? lastSelectCursorPosition
            : currentSelectCursorPosition - 1;
        setSelectCursorPosition(currentSelectCursorPosition);
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

  const handleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectedOptions = (e: React.MouseEvent, option: IOption) => {
    e.preventDefault();
    selectButtonRef.current?.focus();
    if (!selectedOption || selectedOption.id !== option.id) {
      setSelectedOption(option);
    }
  };

  const getOptions = (options: IOption[]) => {
    return options.map((option, index) => {
      const itemStyles = `${styles.select__item}${
        selectedOption?.id === option.id ? " " + styles.selected : ""
      }${selectCursorPosition === index ? " " + styles.cursor : ""}`;
      return (
        <li
          className={itemStyles}
          key={index}
          onClick={(e) => handleSelectedOptions(e, option)}
          onMouseEnter={() => setSelectCursorPosition(index)}
          onMouseLeave={() => setSelectCursorPosition(undefined)}
        >
          {option.value}
        </li>
      );
    });
  };

  return (
    <div
      className={styles.select}
      onKeyDown={selectKeyDownHandler}
      ref={selectRef}
    >
      <div className={styles.select__wrapper}>
        <button
          className={styles.select__button}
          type="button"
          onClick={handleSelect}
          ref={selectButtonRef}
        >
          {selectedOption
            ? selectedOption.value
            : placeHolder || "Select options"}
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