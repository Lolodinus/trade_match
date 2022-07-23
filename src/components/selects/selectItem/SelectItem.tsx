import React, { useEffect, useState } from "react";
import { firestoreDb } from "../../../services/firebase";
import { transformDataToItem } from "../../../services/firebase/transformData";

// Components
import { Select } from "..";

// Types
import { IItem } from "../../../interface/tradeMatch";
import { IOption, ISelectProps } from "../../../interface/components";

// type SelectItemProps = Omit<ISelectProps, "options">;

interface SelectItemProps extends Omit<ISelectProps, "options"> {
    exceptions?: Array<string | undefined>;
}

const SelectItem = (props: SelectItemProps) => {
    const { 
        setSelectedOption,
        onBlurSelectHandler,
        selectedOption,
        exceptions,
        ...atributes
    } = props;
    const [items, setItems] = useState<IOption[]>();

    const getItems = async() => {
        try {
            const data = await firestoreDb.getDocs("item/");
            if (!data) throw new Error("Items fetch is failed");
            const items: IItem[] = transformDataToItem(data);
            return items;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getItems()
            .then(items => {
                if (!items) return;
                let filteredItem: IItem[] = items;
                if (exceptions) {
                    filteredItem = items.filter(item => {
                        for (let exception of exceptions) {
                            if (exception === item.id) return false;
                        }
                        return true;
                    })
                }
                if(filteredItem.length <= 0) return;
                let options: IOption[] = filteredItem.map((item, index) => {
                    return {
                        ...item,
                        label: `${index + 1}. ${item.title} (${item.id})`
                    }
                });
                setItems(options);
            })
            .catch(error => console.log(error));
    }, [exceptions])

    return (
        <>
            { items && 
                <Select
                    options={ items }
                    selectedOption={ selectedOption }
                    setSelectedOption={ setSelectedOption }
                    onBlurSelectHandler={ onBlurSelectHandler }
                    { ...atributes }
                /> 
            }
        </>
    )
}

export default SelectItem;