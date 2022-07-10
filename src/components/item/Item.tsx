import React from "react";

// Styles
import styles from "./Item.module.scss";

// Types
interface IItemProps {
  content: JSX.Element;
}

const Item = (props: IItemProps): JSX.Element => {
  const { content } = props;

  return (
    <li className={styles.item}>
      <div className={styles.item__content}>{content}</div>
    </li>
  );
};

export default Item;
