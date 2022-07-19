import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAllItems } from "../../store/reducers/adminePanel/ActionCreators";
import PATHS from "../../const/link";

// Component
import { List, ListItem, EditItem, LinkItem } from "../../components";
import { isItem } from "../../utils/objIsType";

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
					items={ [{}, ...items] }
					renderItem={(item, index) => (
						<ListItem key={ index } >
							{ isItem(item, ["id"])
								? <EditItem item={ item } />
								: <LinkItem link={ PATHS.createItem }>
									<i className="fa-solid fa-file-circle-plus"/>
								</LinkItem>
							}
						</ListItem>
					)}
				/>
			)}
		</div>
	);
};


export default ItemList;
