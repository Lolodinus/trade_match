import React from "react";

// Styles
import styles from "./List.module.scss";

interface IListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function List<T>(props: IListProps<T>) {
  return <ul className={styles.list}>{props.items.map(props.renderItem)}</ul>;
}
