import React from "react";

// Components
import { GamePanel } from "../";

import styles from "./GamePage.module.scss";

// Types
interface GamePageProps {
    title: string;
	children?: React.ReactNode;
}

const GamePage = (props: GamePageProps) => {
    const { title, children } = props;

    return(
        <div className={ styles.page }>
            <h1 className={ styles.page__title } >
                { title }
            </h1>
            <div className={ styles.page__content }>
                { children }
            </div>
            <GamePanel/>
        </div>
    )
}

export default GamePage;