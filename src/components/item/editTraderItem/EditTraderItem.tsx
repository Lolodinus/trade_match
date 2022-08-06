import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from "../../../hooks/redux";
import { traderItemDelete } from "../../../store/reducers/adminePanel/ActionCreators";
import { sendNotification } from "../../../store/reducers/notification/ActionCreators";

// Components
import { Button } from "../../";

// Styles
import styles from "./EditTraderItem.module.scss";

// Types
import { ITrader, IType } from "../../../interface/tradeMatch";

interface IEditTraderItemProps {
    trader: ITrader;
	types?: IType[];
}

const EditTraderItem = (props: IEditTraderItemProps) => {
	const { trader, types } = props;
	const dispatch = useAppDispatch();
	let navigate = useNavigate();

	const getTypeLabel = (typeID: string, types?: IType[]) => {
		if (!types) return typeID;
		const typeLabel = types.find(type => type.id === typeID)?.value;
		return typeLabel ? typeLabel : typeID;
	}

	return (
		<div className={styles.item}>
			<div className={styles.item__title}>{trader.name}</div>
			<div className={styles.item__img}>
				<img src={trader.imgUrl} alt={trader.name} />
			</div>
			<div className={styles.item__type}>{getTypeLabel(trader.type, types)}</div>
			<div className={styles.item__action}>
				<Button
					typeButton="ACSENT_BUTTON"
					size={"SMALL"}
					onClick={() => {
						navigate(`${trader.id}`, { state: { ...trader } });
					}}
				>
					<FontAwesomeIcon icon={ faPenToSquare } />
				</Button>
				<Button
					typeButton="ACSENT_BUTTON"
					size={"SMALL"}
					onClick={ async () => {
						try {
							await dispatch(traderItemDelete(trader));
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
}


export default EditTraderItem;