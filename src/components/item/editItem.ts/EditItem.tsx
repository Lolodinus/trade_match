import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { sendNotification } from "../../../store/reducers/notification/ActionCreators";
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
				<FontAwesomeIcon icon={ faCoins } className={ styles.item__icon }/>
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
					<FontAwesomeIcon icon={ faPenToSquare } />
				</Button>
				<Button
					typeButton="ACSENT_BUTTON"
					size={"SMALL"}
					onClick={ async () => {
						try {
							await dispatch(itemDelete(item));
							dispatch(sendNotification("Item deleted", "SUCCESS"));
						} catch (error) {
							dispatch(sendNotification("Error. Failed to delete item.", "FAIL"));
						}
					} }
				>
					<FontAwesomeIcon icon={ faTrashCan } />
				</Button>
			</div>
		</div>
	);
};

export default EditItem;