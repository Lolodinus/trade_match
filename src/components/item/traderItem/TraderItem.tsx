import React from "react";

// Styles
import styles from "./TraderItem.module.scss";

// Types
import { ITrader } from "../../../interface/tradeMatch";

interface ITraderItemProps {
    trader: ITrader;
    typeTitle: string;
}

const TraderItem = (props: ITraderItemProps) => {
    const { trader: { name,  imgUrl, type }, typeTitle } = props;

    return (
        <div className={ styles.item }>
            <h3 className={ styles.item__title }>
                { name }
            </h3>
            <div className={ styles.item__image }>
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