import React, { useEffect, useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { CSSTransition } from 'react-transition-group';
import PATHS from "../../const/link";

// Styles
import styles from "./Header.module.scss";


const Header = (): JSX.Element => {
	const location = useLocation();
	const thisIsGame =  /game/.test(location.pathname);
	const [moneyActive, setMoneyActive] = useState(false);
	const [dayActive, setDayActive] = useState(false);
	const [bagItemActive, setBagItemActive] = useState(false);
	const { money, day, maxBagItem } = useAppSelector(state => state.gameReducer);
	const { itemCells } = useAppSelector(state => state.bagReducer);
	useEffect(()=> {
		setMoneyActive(true)
	}, [money])

	useEffect(()=> {
		setDayActive(true)
	}, [day])

	useEffect(()=> {
		setBagItemActive(true)
	}, [itemCells.length])

	return (
		<div className={ styles.header }>
			<div className={ `${styles.header__left} ${styles["game-state"]}` }>
				{ thisIsGame && 
					<>
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
					</>
				}
			</div>
				<Link to={ PATHS.main } className={ styles.header__center }>Trade</Link>
			<div className={ `${styles.header__right} ${styles["game-state"]}` }>
				{ thisIsGame && 
					<CSSTransition
						in={ bagItemActive }
						timeout={400}
						classNames={{
							enterActive: styles.active,
						}}
						onEntered={() => {
							setBagItemActive(false)
						}}
					>
						<NavLink to={ `${PATHS.game}/${PATHS.bag}` } className={ `${styles["game-state__element"]} ${styles._link}` }>
							<i className={ `${styles["game-state__icon"]} ${styles._bag}` }/>
							{ `${itemCells.length}/${maxBagItem}` }
						</NavLink>
					</CSSTransition>
				}
			</div>
		</div>
	);
};

export default Header;
