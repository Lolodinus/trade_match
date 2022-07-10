import React from "react";
import { nextDay, spendMoney } from "../../store/reducers/game/GameReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

// Components
import { Button } from "../";

// Styles
import styles from "./GamePanel.module.scss";


const GamePanel = () => {
	const { money } = useAppSelector(state => state.gameReducer);
    const dispatch = useAppDispatch();

    const endDay = () => {
        if (money < 0) return;
        dispatch(nextDay());
        dispatch(spendMoney(10));
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