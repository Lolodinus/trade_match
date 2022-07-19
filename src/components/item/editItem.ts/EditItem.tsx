import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { itemDelete } from "../../../store/reducers/adminePanel/ActionCreators";

// Components
import { Button } from "../../";

// Styles
import styles from "./EditItem.module.scss";

// Types
import { IItem } from "../../../interface/tradeMatch";

interface IEditItemProps {
  	item: IItem;
}

const EditItem = (props: IEditItemProps) => {
	const { item } = props;
	const dispatch = useAppDispatch();
	let navigate = useNavigate();

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

export default EditItem;