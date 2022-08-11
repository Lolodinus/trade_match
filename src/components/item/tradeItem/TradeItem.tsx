import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { spendMoney } from "../../../store/reducers/game/GameReducer";
import { itemAdd } from "../../../store/reducers/bag/BagReducer";

// Components
import { Button } from "../../";

// Styles
import styles from "./TradeItem.module.scss";

// Types
import { ITraderItem } from "../../../interface/tradeMatch";
import { sendNotification } from "../../../store/reducers/notification/ActionCreators";


interface ITradeItemProps {
	item: ITraderItem;
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
				<FontAwesomeIcon icon={ faCoins } className={ styles.item__icon }/>
				{ item.traderPrice || item.price }
			</div>
			<div className={styles.item__action}>
				<Button
					typeButton="ACSENT_BUTTON"
					size={"SMALL"}
					onClick={() => {
						if (item.price > money || itemCells.length >= maxBagItem ) {
							if( item.price > money ) {
								dispatch(sendNotification("Not enough money", "INFO"))
							};
							if( itemCells.length >= maxBagItem ) {
								dispatch(sendNotification("There is no space in the bag", "INFO"))
							};
							return;
						};
						dispatch(spendMoney(item.traderPrice || item.price));
						dispatch(itemAdd({item, maxCells: maxBagItem}));
					}}
				>
					Buy
				</Button>
				<Button
					typeButton="ACSENT_BUTTON"
					size={"SMALL"}
				>
					sell
				</Button>
			</div>
		</div>
	);
}

export default TradeItem;