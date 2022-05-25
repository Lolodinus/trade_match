import React from "react";

// Component
import { Navbar } from "../";

// Styles
import styles from "./Header.module.scss";

const Header = (): JSX.Element => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <Navbar />
      </div>
      <div className={styles.header__center}>Trade</div>
      <div className={styles.header__right}></div>
    </div>
  );
};

export default Header;
