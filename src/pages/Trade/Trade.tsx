import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchItems } from "../../store/reducers/item/ActionCreators";
import { spendMoney, getMoney, removeItem } from "../../store/reducers/game/GameReducer";
import { itemAdd } from "../../store/reducers/bag/BagReducer";

// Components
import { List, Item, Button, GamePanel } from "../../components";

// Styles
import styles from "./Trade.module.scss";

// Types
import { IItem } from "../../interface/tradeMatch";

type tradeProps = {
	item: IItem;
}


const ShopItem = (props: tradeProps) => {
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
						dispatch(itemAdd({item, maxCells: maxBagItem}))
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


const Trade = () => {
	const { items } = useAppSelector(state => state.itemReducer);
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		if (!items || items.length > 0) return;
		dispatch(fetchItems(10));
	}, [items])


    return (
        <div className={ styles.trade }>
			<h1 className={ styles.trade__title } >
            	Trade
			</h1>
			<div className={ styles.trade__content }>
				{items && (
					<List
						items={items}
						renderItem={(item) => (
							<Item 
								content={<ShopItem item={item} />} 
								key={item.id}
							/>
						)}
					/>
				)}
			</div>
			<GamePanel/>
        </div>
    )
}


export default Trade;