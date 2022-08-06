import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import PATHS from "../../const/link";

// Styles
import styles from "./AdminePanel.module.scss";


const AdminePanel = () => {
    return (
        <div className={ styles.panel }>
            <h1 className={ styles.panel__title }>
                Admine panel
            </h1>
            <div className={ styles.panel__wrapper }>
                <div className={ styles.panel__naw }>
                    <NavLink 
                        to={ PATHS.itemList } 
                        className={({ isActive }) =>
                            isActive 
                                ? `${styles.panel__link} ${styles.active}`
                                : styles.panel__link
                        }
                        onMouseDown={(e: React.MouseEvent) => {
                            e.preventDefault()
                        }}
                    >
                        Item
                    </NavLink>
                    <NavLink 
                        to={ PATHS.traderList } 
                        className={({ isActive }) =>
                            isActive 
                                ? `${styles.panel__link} ${styles.active}` 
                                : styles.panel__link
                        }
                        onMouseDown={(e: React.MouseEvent) => {
                            e.preventDefault()
                        }}
                    >
                        Trader
                    </NavLink>
                </div>
                <div className={ styles.panel__content }>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}


export default AdminePanel;