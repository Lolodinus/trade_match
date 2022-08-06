import React from "react";

// Components
import { CreateItemForm } from "../../../components";

// Styles
import styles from "./ItemCreate.module.scss";

const ItemCreate = () => {
	return (
		<div className={styles.create}>
			<div className={ styles.create__content }>
				<h1 className={ styles.create__title }>
					Create Item
				</h1>
				<CreateItemForm />
			</div>
		</div>
	);
};

export default ItemCreate;
