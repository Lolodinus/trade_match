import React from "react";
import { Routes, Route } from "react-router-dom";

// Component
import { Header } from "../";

// Page
import { Main, NotFound } from "../../pages";

// Styles
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      {/* header */}
      <div className={`${styles.app__header} ${styles.header}`}>
        <div className={styles.header__container}>
          <div className={styles.header__row}>
            <Header />
          </div>
        </div>
      </div>
      {/* body */}
      <div className={`${styles.app__body} ${styles.body}`}>
        <div className={styles.body__container}>
          <div className={styles.body__row}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
