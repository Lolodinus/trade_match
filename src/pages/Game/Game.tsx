import React, { useState } from "react";
import { Outlet, useOutletContext  } from "react-router-dom";

// Components
import { GamePanel, TraderBar } from "../../components";
import { newTabTitle } from "../../utils/general";

// Styles
import styles from "./Game.module.scss";

// Types
type ContextType = { 
    title: string;
    setTitle: (title: string) => void
};


const Game = () => {
    newTabTitle("Game");
    const [title, setTitle] = useState<string>("");

    return(
        <div className={ styles.page }>
            <h1 className={ styles.page__title } >
                { title }
            </h1>
            <div className={ styles.page__wrapper }>
                <div className={ styles.page__content }>
                    <Outlet context={ { title, setTitle } }/>
                </div>
                <div className={ styles.page__sidebar }>
                    <TraderBar/>
                </div>
            </div>
            <GamePanel/>
        </div>
    )
}

export function useTitle() {
    return useOutletContext<ContextType>();
}

export default Game;