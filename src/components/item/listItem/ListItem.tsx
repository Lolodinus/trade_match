import React from "react";

// Styles
import styles from "./ListItem.module.scss";

// Types
interface IItemProps {
  children?: JSX.Element;
}

const ListItem = (props: IItemProps): JSX.Element => {
	const { children } = props;
	return (
		<li className={styles.item}>
			<div className={styles.item__content}>
				{ children }
			</div>
		</li>
	);
};

export default ListItem;
