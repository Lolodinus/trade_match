import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

// Styles
import styles from "./TraderItem.module.scss";

// Types
import { ITrader } from "../../../interface/tradeMatch";
import { gameSlice } from "../../../store/reducers/game/GameReducer";

interface ITraderItemProps {
    trader: ITrader;
}

const TraderItem = (props: ITraderItemProps) => {
    const { trader: { id, name,  imgUrl, type } } = props;
	const { activeTrader } = useAppSelector(state => state.gameReducer);
	const dispatch = useAppDispatch();

    return (
        <div className={ styles.item }>
            <h3 className={ styles.item__title }>
                { name }
            </h3>
            <div 
                className={ styles.item__image }
                onClick={() => dispatch(gameSlice.actions.setActiveTrader(id))}
            >
                <img  
                    src={ imgUrl }
                    alt={ name } 
                />
            </div>
            <div className={ styles.item__type }>
                { type }
            </div>
        </div>
    )
}


export default TraderItem;