import React, { useEffect, useState } from "react";
import { firestoreDb } from "../../services/firebase";
import { transformDataToItem } from "../../services/firebase/transformData";

// Component
import { List, Item } from "../../components";

// Styles
import styles from "./ItemList.module.scss";

// Types
import { IItem } from "../../interface/tradeMatch";

interface propsTradeItem {
  item: IItem;
}

const TradeItem = (props: propsTradeItem) => {
  const { item } = props;
  return (
    <div className={styles.item}>
      <div className={styles.item__title}>{item.title}</div>
      <div className={styles.item__img}>
        {item && <img src={item.imgUrl} alt={item.title} />}
      </div>
      <div className={styles.item__price}>{item.price}</div>
      <div className={styles.item__action}>
        <button className={styles["item__action-btn"]}>{">>"}</button>
      </div>
    </div>
  );
};

const ItemList = () => {
  const [items, setItems] = useState<IItem[] | undefined>();
  const fetchItem = async () => {
    const data = await firestoreDb.getDocs("item");
    return transformDataToItem(data);
  };
  useEffect(() => {
    if (items) return;
    fetchItem()
      .then((items) => {
        setItems(items);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      {items && (
        <List
          items={items}
          renderItem={(item) => <Item content={<TradeItem item={item} />} />}
        />
      )}
    </div>
  );
};

export default ItemList;
