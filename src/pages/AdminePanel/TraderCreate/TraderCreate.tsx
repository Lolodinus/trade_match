import React from "react";

// Components
import { CreateTraderForm } from "../../../components";

// Styles
import styles from "./TraderCreate.module.scss";


const TraderCreate = () => {
    return (
        <div className={ styles.create }>
            <div className={ styles.create__content }>
                <h1 className={ styles.create__title }>
                    Create Trader
                </h1>
                <CreateTraderForm/>
            </div>
        </div>
    )
}


export default TraderCreate;