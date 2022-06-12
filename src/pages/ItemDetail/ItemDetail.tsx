import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import TradeMatch from "../../services/TradeMatch/TradeMatchItem";
import { isItem } from "../../utils/objIsType";

// Components
import { UpdateItemForm } from "../../components";

// Styles
import styles from "./ItemDetail.module.scss";

// Types
import { IItem } from "../../interface/tradeMatch";

const ItemDetail = () => {
  const [item, setItem] = useState<IItem | undefined>();
  const location = useLocation();
  const { id } = useParams();
  const tradeMatch = new TradeMatch("item/");

  useEffect(() => {
    const { state } = location;
    if (state !== null && isItem(state, ["id", "title", "price", "type"])) {
      setItem(state);
    } else {
      if (id) {
        tradeMatch.getItemById(id).then((item) => {
          setItem(item);
        });
      }
    }
  }, []);

  return (
    <div className={styles.detail}>
      <UpdateItemForm item={item} />
    </div>
  );
};

export default ItemDetail;
