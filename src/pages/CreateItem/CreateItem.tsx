import React from "react";

// Components
import { CreateItemForm } from "../../components";

// Styles
import styles from "./CreateItem.module.scss";

const CreateItem = () => {
  return (
    <div className={styles.create}>
      <CreateItemForm />
    </div>
  );
};

export default CreateItem;
