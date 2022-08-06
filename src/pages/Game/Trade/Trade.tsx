import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchItems } from "../../../store/reducers/item/ActionCreators";
import { getRandomNumber } from "../../../utils/getRandomNumber";
import { useTitle } from "../Game";

// Components
import { List, ListItem, TradeItem } from "../../../components";

// Types
import { IItem, ITraderItem } from "../../../interface/tradeMatch";


const Trade = () => {
	const { setTitle } = useTitle();
	const { items } = useAppSelector(state => state.itemReducer);
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		if (!items || items.length > 0) return;
		dispatch(fetchItems(10));
	}, [items])

	useEffect(() => {
		setTitle("Trade");
	}, [])

	const setTraderPrice = (items: IItem[]) => {
		const traderItems: ITraderItem[] = [];
		for(let item of items) {
			const repitItem = traderItems.find(traderItem => traderItem.id === item.id);
			traderItems.push({
				...item,
				traderPrice: repitItem 
					? repitItem.traderPrice 
					: getRandomNumber(item.price + 15, item.price - 15)
			})
		}
		return traderItems;
	}

    return (
		<>
			{items && (
				<List
					items={ setTraderPrice(items) }
					renderItem={(item) => (
						<ListItem key={item.id} >
							<TradeItem item={item} />
						</ListItem>
					)}
				/>
			)}
		</>
    )
}


export default Trade;