import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { CSSTransition } from 'react-transition-group';

// Component
import { Navbar, Button } from "../";

// Styles
import styles from "./Header.module.scss";

const Header = (): JSX.Element => {
	const [moneyActive, setMoneyActive] = useState(false);
	const [dayActive, setDayActive] = useState(false);
    const { user } = useAppSelector(state => state.userReducer);
	const { money, day } = useAppSelector(state => state.gameReducer);
	const navigate = useNavigate();

	useEffect(()=> {
		setMoneyActive(true)
	}, [money])

	useEffect(()=> {
		setDayActive(true)
	}, [day])

	return (
		<div className={styles.header}>
			<div className={ `${styles.header__left} ${styles["game-state"]}` }>
				<CSSTransition
					in={ moneyActive }
					timeout={400}
					classNames={{
						enterActive: styles.active,
					}}
					onEntered={() => {
						setMoneyActive(false)
					}}
				>
						<div className={ styles["game-state__element"] }>
							<i className="fa-solid fa-coins" />
							{ money }
						</div>
				</CSSTransition>
				<CSSTransition
					in={ dayActive }
					timeout={400}
					classNames={{
						enterActive: styles.active,
					}}
					onEntered={() => {
						setDayActive(false)
					}}
				>
						<div className={ styles["game-state__element"] }>
							<i className="fa-solid fa-sun"/>
							{ day }
						</div>
				</CSSTransition>
			</div>
				<Link to="/" className={styles.header__center}>Trade</Link>
			<div className={styles.header__right}>
				<Button typeButton="ACSENT_BUTTON" onClick={() => {
					navigate("authentication")
				}}>
					{user ? "Logout" : "Login"}
				</Button>
				<Navbar />
			</div>
		</div>
	);
};

export default Header;
