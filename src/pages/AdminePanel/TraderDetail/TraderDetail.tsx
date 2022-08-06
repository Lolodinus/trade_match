import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import TradeMatch from "../../../services/TradeMatch/TradeMatchItem";
import { isError, isTrader } from "../../../utils/objIsType";

// Components
import { UpdateTraderForm } from "../../../components";

// Styles
import styles from "./TraderDetail.module.scss";

// Types
import { ITrader } from "../../../interface/tradeMatch";

const TraderDetail = () => {
	const [trader, setTrader] = useState<ITrader | undefined>();
	const navigate = useNavigate();
	const location = useLocation();
	const { id } = useParams();
	const tradeMatch = new TradeMatch("trader/");


	useEffect(() => {
		const { state } = location;
		if (state !== null && isTrader(state, ["id", "name", "type"])) {
			setTrader(state);
		} else {
			if (!id) return navigate("not_found");
			tradeMatch.getItemById(id)
			.then((trader) => {
				if (isError(trader)) throw new Error(trader.message); 
				if(isTrader(trader, ["id", "name", "type", "imgUrl"])) setTrader(trader);
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
				<UpdateTraderForm trader={ trader } />
			</div>
		</div>
	);
};

export default TraderDetail;