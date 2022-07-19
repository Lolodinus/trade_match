import React from "react";

// Styles
import styles from "./BagItem.module.scss";

// Types
import { IItem } from "../../../interface/tradeMatch";


interface IBagItemProps {
    item?: IItem;
    active: boolean;
}

const BagItem = (props: IBagItemProps) => {
	const { item, active } = props;
    return (
        <div className={ active 
            ? `${styles.item} ${styles.active}`
            : styles.item }
        >
            { item && (
                <>
                    <div className={styles.item__title}>{item.title}</div>
                    <div className={styles.item__img}>
                        {item.imgUrl && <img src={item.imgUrl} alt={item.title} draggable="false"/>}
                    </div>
                </>
            ) }
		</div>
    )
}

export default BagItem;