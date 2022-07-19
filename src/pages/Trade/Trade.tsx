import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchItems } from "../../store/reducers/item/ActionCreators";

// Components
import { List, ListItem, TradeItem, GamePage } from "../../components";


const Trade = () => {
	const { items } = useAppSelector(state => state.itemReducer);
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		if (!items || items.length > 0) return;
		dispatch(fetchItems(10));
	}, [items])


    return (
		<GamePage title="Trade">
			{items && (
				<List
					items={items}
					renderItem={(item) => (
						<ListItem key={item.id} >
							<TradeItem item={item} />
						</ListItem>
					)}
				/>
			)}
		</GamePage>
    )
}


export default Trade;