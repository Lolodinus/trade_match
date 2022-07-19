import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import styles from "./LinkItem.module.scss";

// Types
interface ILinkItemProps {
    link: string;
    children?: React.ReactNode;
}

const LinkItem = (props: ILinkItemProps) => {
    const { link, children } = props;
	return (
		<NavLink className={ styles.link } to={ link }>
            { children }
		</NavLink>
	)
}

export default LinkItem;