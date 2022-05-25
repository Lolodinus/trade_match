import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        <li className={styles.navigation__item}>
          <NavLink to="/">Main</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
