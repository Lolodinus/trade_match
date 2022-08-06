import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchAllTrader } from "../../../store/reducers/adminePanel/ActionCreators";
import PATHS from "../../../const/link";
import { firestoreDb } from "../../../services/firebase";
import { transformDataToType } from "../../../services/firebase/transformData";

// Component
import { List, ListItem, LinkItem, EditTraderItem } from "../../../components";
import { isTrader } from "../../../utils/objIsType";

// Styles
import styles from "./TraderList.module.scss";

// Types
import { IType } from "../../../interface/tradeMatch";
import { sendNotification } from "../../../store/reducers/notification/ActionCreators";


const TraderList = () => {
	const { traders } = useAppSelector(state => state.adminPanelReducer);
	const [ types, setTypes ] = useState<IType[]>([]);
	const dispatch = useAppDispatch();
	
    const getTypes = async() => {
        try {
            const data = await firestoreDb.getDocs("type/");
            if (!data) throw new Error("Items fetch is failed");
            const types: IType[] = transformDataToType(data);
            return types;
        } catch (error) {
            console.log(error);
        }
    }

	useEffect(() => {
		if(traders?.length > 0) return;
		dispatch(fetchAllTrader());
	}, [traders])

	useEffect(() => {
		if(types?.length > 0) return;
		getTypes()
			.then(types => {
				if(!types) return;
				setTypes(types);
			})
			.catch(() => {
				dispatch(sendNotification("Filed featch types", "FAIL"));
			})
	}, [types])
  
	return (
		<div>
			{traders && (
				<List
					items={ [{}, ...traders] }
					renderItem={(trader, index) => (
						<ListItem key={ index } >
							{ isTrader(trader, ["id"])
								? <EditTraderItem trader={ trader } types={ types } />
								: <LinkItem link={ PATHS.createTrader }>
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


export default TraderList;