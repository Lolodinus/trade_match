import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAllItems, itemDelete } from "../../store/reducers/adminePanel/ActionCreators";

// Component
import { List, Item, Button } from "../../components";

// Styles
import styles from "./ItemList.module.scss";

// Types
import { IItem } from "../../interface/tradeMatch";

interface propsTradeItem {
  	item: IItem;
}

const TradeItem = (props: propsTradeItem) => {
	const { item } = props;
	const dispatch = useAppDispatch();
	let navigate = useNavigate();

	return (
		<div className={styles.item}>
			<div className={styles.item__title}>{item.title}</div>
			<div className={styles.item__img}>
				{item.imgUrl && <img src={item.imgUrl} alt={item.title} />}
			</div>
			<div className={styles.item__price}>{item.price}</div>
			<div className={styles.item__action}>
				<Button
					typeButton="ACSENT_BUTTON"
					size={"SMALL"}
					onClick={() => {
						navigate(`${item.id}`, { state: { ...item } });
					}}
				>
					<i className="fa-solid fa-pen-to-square"/>
				</Button>
				<Button
					typeButton="ACSENT_BUTTON"
					size={"SMALL"}
					onClick={ () => dispatch(itemDelete(item)) }
				>
					<i className="fa-solid fa-trash-can"/>
				</Button>
			</div>
		</div>
	);
};

const ItemList = () => {
	const { items } = useAppSelector(state => state.adminPanelReducer);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchAllItems());
	}, [])
  
	return (
		<div>
			{items && (
				<List
					items={items}
					renderItem={(item) => (
						<Item 
							content={<TradeItem item={item} />} 
							key={item.id} 
						/>
					)}
				/>
			)}
		</div>
	);
};

export default ItemList;
