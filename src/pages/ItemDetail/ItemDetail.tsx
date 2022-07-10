import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import TradeMatch from "../../services/TradeMatch/TradeMatchItem";
import { isItem, isError } from "../../utils/objIsType";

// Components
import { UpdateItemForm } from "../../components";

// Styles
import styles from "./ItemDetail.module.scss";

// Types
import { IItem } from "../../interface/tradeMatch";

const ItemDetail = () => {
	const [item, setItem] = useState<IItem | undefined>();
	const navigate = useNavigate();
	const location = useLocation();
	const { id } = useParams();
	const tradeMatch = new TradeMatch("item/");


	useEffect(() => {
		const { state } = location;
		if (state !== null && isItem(state, ["id", "title", "price", "type"])) {
			setItem(state);
		} else {
		if (!id) return navigate("not_found");
			tradeMatch.getItemById(id)
			.then((item) => {
				if (isError(item)) throw new Error(item.message); 
				setItem(item);
			})
			.catch(error => {
				navigate("/not_found");
				console.log(error.message);
			});
		}
	}, []);

	return (
		<div className={ styles.detail }>
			<div className={ styles.detail__content }>
				<div className={ styles.detail__title } >
					Edit { id }
				</div>
				<UpdateItemForm item={item} />
			</div>
		</div>
	);
};

export default ItemDetail;
