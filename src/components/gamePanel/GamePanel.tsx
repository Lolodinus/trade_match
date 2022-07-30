import React from "react";
import { nextDay, spendMoney } from "../../store/reducers/game/GameReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

// Components
import { Button } from "../";

// Styles
import styles from "./GamePanel.module.scss";
import { sendNotification } from "../../store/reducers/notification/ActionCreators";


const GamePanel = () => {
	const { money, day } = useAppSelector(state => state.gameReducer);
    const dispatch = useAppDispatch();

    const endDay = () => {
        if (money < 0) return;
        dispatch(nextDay());
        dispatch(spendMoney(10));
        dispatch(
            sendNotification(
                `${ day + 1 } day. It's a brand new day`,
                "INFO"
            )
        );
    }

    return (
        <div className={ styles.panel }>
            <Button 
                typeButton="ACSENT_BUTTON" 
                size="MEDIUM"
                onClick={ endDay }
            >
                Next Day
            </Button>
        </div>
    )
}

export default GamePanel; 