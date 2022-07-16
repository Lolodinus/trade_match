import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

// Styles
import styles from "./Navbar.module.scss";

const Navbar = () => {
    const { user } = useAppSelector(state => state.userReducer);

	return (
		<nav className={styles.navigation}>
			<ul className={styles.navigation__list}>
				<li className={styles.navigation__item}>
					<NavLink to="/">Main</NavLink>				
				</li>
				{ user?.role === "ADMINISTRATOR" && <>
					<li className={styles.navigation__item}>
						<NavLink to="/create">Create</NavLink>
					</li>
					<li className={styles.navigation__item}>
						<NavLink to="/list">Items</NavLink>				
					</li>
					<li className={styles.navigation__item}>
						<NavLink to="/bag">Bag</NavLink>				
					</li>
				</> }
			</ul>
		</nav>
	);
};

export default Navbar;
