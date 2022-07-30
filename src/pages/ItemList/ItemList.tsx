import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAllItems } from "../../store/reducers/adminePanel/ActionCreators";
import PATHS from "../../const/link";

// Component
import { List, ListItem, EditItem, LinkItem } from "../../components";
import { isItem } from "../../utils/objIsType";

// Styles
import styles from "./ItemList..module.scss";

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
									<div className={ styles["add-item"] }>
										<FontAwesomeIcon icon={ faFileCirclePlus } className={ styles["add-item__icon"] } />
										<p className={ styles["add-item__text"] }>Add item</p>
									</div>
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
