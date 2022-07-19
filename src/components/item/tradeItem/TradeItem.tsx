import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { spendMoney, getMoney, removeItem } from "../../../store/reducers/game/GameReducer";
import { itemAdd } from "../../../store/reducers/bag/BagReducer";

// Components
import { Button } from "../../";

// Styles
import styles from "./TradeItem.module.scss";

// Types
import { IItem } from "../../../interface/tradeMatch";


interface ITradeItemProps {
	item: IItem;
}

const TradeItem = (props: ITradeItemProps) => {
	const { item } = props;
	const { money, bagItem, maxBagItem } = useAppSelector(state => state.gameReducer);
	const { itemCells } = useAppSelector(state => state.bagReducer);
	const dispatch = useAppDispatch();

	return (
		<div className={styles.item}>
			<div className={styles.item__title}>{item.title}</div>
			<div className={styles.item__img}>
				{item.imgUrl && <img src={item.imgUrl} alt={item.title} />}
			</div>
			<div className={styles.item__price}>
				<i className="fa-solid fa-coins" />
				{item.price}
			</div>
			<div className={styles.item__action}>
				<Button
					typeButton="ACSENT_BUTTON"
					size={"SMALL"}
					onClick={() => {
						if (item.price > money || itemCells.length >= maxBagItem ) return;
						dispatch(spendMoney(item.price));
						dispatch(itemAdd({item, maxCells: maxBagItem}));
					}}
				>
					Buy
				</Button>
				<Button
					typeButton="ACSENT_BUTTON"
					size={"SMALL"}
					onClick={ () => {
						if (bagItem === 0 ) return;
						dispatch(getMoney(item.price));
						dispatch(removeItem());
					} }
				>
					sell
				</Button>
			</div>
		</div>
	);
}

export default TradeItem;