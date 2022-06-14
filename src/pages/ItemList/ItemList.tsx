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
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchItems, itemDelete } from "../../store/reducers/ActionCreators";

interface propsTradeItem {
  item: IItem;
}

const TradeItem = (props: propsTradeItem) => {
  const { item } = props;
  const dispatch = useAppDispatch();
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
          onClick={ () => dispatch(itemDelete(item)) }
        />
      </div>
    </div>
  );
};

const ItemList = () => {
  const { items } = useAppSelector(state => state.itemReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchItems());
  }, [])
  
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
