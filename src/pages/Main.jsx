import React, { useState } from "react";

// Components
import { List, Item, DraggbleElement } from "../components";

// Types
import { IItem } from "../interface/item";

const Main = () => {
  const [items, setItems] = useState();

  const getEmptyСell = (quantity: number) => {
    const cells = [];
    for (let i; i < quantity; i++) {
      cells.push(<Item />);
    }
  };

  return (
    <div>
      <List />
    </div>
  );
};

export default Main;
