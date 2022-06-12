import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  let navigate = useNavigate();
  return (
    <div className={styles.item}>
      <div className={styles.item__title}>{item.title}</div>
      <div className={styles.item__img}>
        {item.imgUrl && <img src={item.imgUrl} alt={item.title} />}
      </div>
      <div className={styles.item__price}>{item.price}</div>
      <div className={styles.item__action}>
        <button
          className={styles["item__action-btn"]}
          onClick={() => {
            navigate(`${item.id}`, { state: { ...item } });
          }}
        >
          {">>"}
        </button>
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
          renderItem={(item) => (
            <Item content={<TradeItem item={item} />} key={item.id} />
          )}
        />
      )}
    </div>
  );
};

export default ItemList;
