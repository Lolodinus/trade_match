import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchTraders, fetchTypes } from "../../store/reducers/game/ActionCreators";

// Components
import { TraderItem } from "../";

// Styles
import styles from "./TraderBar.module.scss";

// Types
import { ITrader, IType } from "../../interface/tradeMatch";


const TraderBar = () => {
    const [isOpen, setIsOpen] = useState(true);
	const { types, traders } = useAppSelector(state => state.gameReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (types.length > 0) return;
        dispatch(fetchTypes());
    }, []);

    useEffect(() => {
        if(traders.length > 0) return;
        dispatch(fetchTraders(3));
    }, [traders])

    const setType = (trader: ITrader, types?: IType[]) => {
        if (!types || types.length === 0) return {... trader, type: "Undefined"};
        return {
            ...trader,
            type: types.find(type => type.id === trader.type)?.value || "Undefined",
        }
    }

    return(
        <div className={ styles.bar }>
            <div className={ isOpen
                    ? `${ styles.bar__wrapper } ${ styles.active }`
                    : styles.bar__wrapper
                 }>
                <h2 className={ styles.bar__title }>
                    Traders
                </h2>
                <div className={ styles.bar__content }>
                    <div className={ styles.bar__list }>
                        {traders?.length > 0 && traders.map((trader) => {
                            return (
                                <div className={ styles.bar__item } key={ trader.id }>
                                    <TraderItem trader={ setType(trader, types) } />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <button 
                className={ styles.bar__button }
                onClick={ () => setIsOpen(!isOpen) }
            >
                {"<"}
            </button>
        </div>
    )
}

export default TraderBar;