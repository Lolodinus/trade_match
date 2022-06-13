import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestoreDb } from "../../services/firebase";
import { transformDataToItem } from "../../services/firebase/transformData";
import TradeMatch from "../../services/TradeMatch/TradeMatchItem";

// Component
import { List, Item, Button } from "../../components";

// Styles
import styles from "./ItemList.module.scss";

// Types
import { IItem } from "../../interface/tradeMatch";

interface propsTradeItem {
  item: IItem;
  deleteItem: (id: string, imgUrl: string | undefined) => void;
}

const TradeItem = (props: propsTradeItem) => {
  const { item, deleteItem } = props;
  let navigate = useNavigate();

  return (
    <div className={styles.item}>
      <div className={styles.item__title}>{item.title}</div>
      <div className={styles.item__img}>
        {item.imgUrl && <img src={item.imgUrl} alt={item.title} />}
      </div>
      <div className={styles.item__price}>{item.price}</div>
      <div className={styles.item__action}>
        <Button 
          content={<i className="fa-solid fa-pen-to-square"></i>} 
          typeButton="ACSENT_SMALL_BUTTON"
          onClick={() => {
            navigate(`${item.id}`, { state: { ...item } });
          }}
        />
        <Button 
          content={<i className="fa-solid fa-trash-can"></i>}
          typeButton="ACSENT_SMALL_BUTTON"
          onClick={ () => deleteItem(item.id, item.imgUrl) }
        />
      </div>
    </div>
  );
};

const ItemList = () => {
  const [items, setItems] = useState<IItem[] | undefined>();
  const tradeMatch = new TradeMatch("item/");
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
  const deleteItem = (itemId: string, itemImageUrl: string | undefined) => {
    const itemIndex = items?.findIndex(item => item.id === itemId);
    if (!items || itemIndex === undefined || itemIndex < 0) return;
    setItems([
      ...items.slice(0, itemIndex),
      ...items.slice(itemIndex + 1, items.length),
    ]) 
    tradeMatch.deleteItem(itemId, itemImageUrl);
  }
  return (
    <div>
      {items && (
        <List
          items={items}
          renderItem={(item) => (
            <Item content={<TradeItem deleteItem={deleteItem} item={item} />} key={item.id} />
          )}
        />
      )}
    </div>
  );
};

export default ItemList;
