import React, { useEffect, useState } from "react";
import { firestoreDb } from "../../../services/firebase";
import { transformDataToType } from "../../../services/firebase/transformData";

// Components
import { Select } from "../";

// Types
import { IOption, ISelectProps } from "../../../interface/components";
import { IType } from "../../../interface/tradeMatch";


type SelectTypeProps = Omit<ISelectProps, "options">;

const SelectType = (props: SelectTypeProps) => {
    const { 
        setSelectedOption,
        onBlurSelectHandler,
        selectedOption,
        ...atributes
    } = props;
    const [types, setTypes] = useState<IOption[]>();

    const getTypes = async() => {
        try {
            const data = await firestoreDb.getDocs("type/");
            if (!data) throw new Error("Items fetch is failed");
            const types: IType[] = transformDataToType(data);
            return types;
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getTypes()
            .then(types => {
                    if (!types) return;
                    setTypes(
                        types.map((type, index) => {
                            return {
                                ...type,
                                label: `${index + 1}. ${type.value}`
                            }
                        })
                    );
                }
            )
            .catch(error => console.log(error));
    }, [])

    return (
        <>
            { types && 
                <Select
                    options={ types }
                    selectedOption={ selectedOption }
                    setSelectedOption={ setSelectedOption }
                    onBlurSelectHandler={ onBlurSelectHandler }
                    { ...atributes }
                /> 
            }
        </>
    )
}

export default SelectType;