import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

// Component
import { Navbar, Button } from "../";

// Styles
import styles from "./Header.module.scss";

const Header = (): JSX.Element => {
    const { user } = useAppSelector(state => state.userReducer);
	const navigate = useNavigate();

	return (
		<div className={styles.header}>
			<div className={styles.header__left}>
				<Navbar />
			</div>
				<Link to="/" className={styles.header__center}>Trade</Link>
			<div className={styles.header__right}>
				<Button typeButton="ACSENT_BUTTON" onClick={() => {
					navigate("authentication")
				}}>
					{user ? "Logout" : "Login"}
				</Button>
			</div>
		</div>
	);
};

export default Header;
