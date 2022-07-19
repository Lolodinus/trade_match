import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import PATHS from "../../const/link";

// Styles
import styles from "./Menu.module.scss";


const Menu = () => {
    const { user } = useAppSelector(state => state.userReducer);

    return (
        <div className={ styles.menu }>
            <div className={ styles.menu__wrapper }>
                <h1 className={ styles.menu__title }>Menu</h1>
                <ul className={ styles.menu__list }>
					<NavLink 
                        className={ styles.menu__item } 
                        to={ PATHS.game }>
                            Game
                    </NavLink>
                    { user?.role === "ADMINISTRATOR" &&
                        <NavLink 
                            className={ styles.menu__item } 
                            to={ PATHS.adminPanell }>
                                Admin Panel
                        </NavLink>
                    }
					<NavLink 
                        className={ styles.menu__item } 
                        to={ PATHS.authentication }>
                            { user ? "Logout" : "Login" }
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}


export default Menu;