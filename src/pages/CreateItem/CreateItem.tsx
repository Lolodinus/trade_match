import React from "react";

// Components
import { Button } from "../../components";

// Styles
import styles from "./CreateItem.module.scss";

const CreateItem = () => {
  return (
    <div className={styles.create}>
      <form className={styles.form}>
        <label className={styles.form_label}>
          Title
          <input
            className={styles.form_input}
            type="text"
            placeholder="Input title"
            required
          />
        </label>
        <label className={styles.form_label}>
          Price
          <input
            className={styles.form_input}
            type="number"
            placeholder="Input price"
            required
          />
        </label>
        <label className={styles.form_label}>
          Image
          <input type="file" accept=".jpeg,.jpg,.png" />
        </label>
        <label className={styles.form_label}>
          Type
          <select>
            <option value="01">Option 1</option>
            <option value="02">Option 2</option>
            <option value="03">Option 3</option>
          </select>
        </label>
        <Button
          content={"Create"}
          typeButton={"ACSENT_BUTTON"}
          type={"submit"}
        />
        {/* <button type="submit">Create</button> */}
      </form>
    </div>
  );
};

export default CreateItem;
