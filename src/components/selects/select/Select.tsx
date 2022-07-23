import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";

// Styles
import styles from "./Select.module.scss";

// Types
import { IOption, ISelectProps } from "../../../interface/components";


const Select = (props: ISelectProps) => {
    const {
        options,
        setSelectedOption,
        onBlurSelectHandler,
        selectedOption,
        ...atributes
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
            break;
        }
        case "ArrowUp": {
            e.preventDefault();
            currentSelectCursorPosition =
            currentSelectCursorPosition === 0
                ? lastSelectCursorPosition
                : currentSelectCursorPosition - 1;
            setOptionCursorPosition(currentSelectCursorPosition);
            break;
        }
        case "Escape": {
            setIsOpen(false);
            break;
        }
        case "Enter": {
            e.preventDefault();
            setSelectedOption(options[currentSelectCursorPosition]);
            break;
        }
        default: {
            break;
        }
        }
    };

    useClickOutside(selectRef, () => {
        setIsOpen(false);
    });

    // Option handler
    const onClickOptionHandler = (e: React.MouseEvent, option: IOption) => {
        e.preventDefault();
        selectButtonRef.current?.focus();
        if (!selectedOption || selectedOption.id !== option.id) {
            setSelectedOption(option);
        }
    };

    // reset options cursor
    useEffect(() => {
        if (isOpen) return;
        setOptionCursorPosition(0);
    }, [isOpen]);

    const getOptions = (options: IOption[]) => {
        return options.map((option, index) => {
            const itemStyles = `${styles.select__item}${
                selectedOption?.id === option.id ? " " + styles.selected : ""
            }${optionCursorPosition === index ? " " + styles.cursor : ""}`;
            return (
                <li
                    className={itemStyles}
                    key={index}
                    onClick={(e) => onClickOptionHandler(e, option)}
                    onMouseEnter={() => setOptionCursorPosition(index)}
                    onMouseLeave={() => setOptionCursorPosition(undefined)}
                >
                    { option.label }
                </li>
            );
        });
    };

    return (
        <div
            className={ styles.select }
            onKeyDown={ keyDownSelectHandler }
            ref={ selectRef }
            onBlur={ () => { 
                if (!onBlurSelectHandler) return;
                onBlurSelectHandler(isOpen);
            } }
        >
            <select style={ { display: "none" } } { ...atributes } />
            <div className={ styles.select__wrapper }>
                <button
                className={ `${styles.select__button}${
                    isOpen ? " " + styles.open : ""
                }` }
                type="button"
                onClick={ onClickSelectHandler }
                ref={ selectButtonRef }
                >
                { 
                    selectedOption?.label 
                        ? selectedOption.label 
                        : atributes.placeholder || "Select options"
                }
                </button>
                <ul
                    className={
                        isOpen
                        ? `${styles.select__list} ${styles.show}`
                        : styles.select__list
                    }
                >
                    { getOptions(options) }
                </ul>
            </div>
        </div>
    );
};

export default Select;
