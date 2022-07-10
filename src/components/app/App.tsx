import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { authentication } from "../../store/reducers/user/ActionCreators";
import { paths } from "../../const/link";

// HOC
import { RequirePermission } from "../../hoc";

// Component
import { Header } from "../";

// Page
import { 
    Main, 
    NotFound, 
    CreateItem, 
    ItemList, 
    ItemDetail, 
    Authentication, 
    Registration, 
    Login,
    Logout,
    Trade
} from "../../pages";

// Styles
import styles from "./App.module.scss";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authentication())
    }, [])
  

    return (
        <div className={styles.app}>
        {/* header */}
        <div className={`${styles.app__header} ${styles.header}`}>
            <div className={styles.header__container}>
            <div className={styles.header__row}>
                <Header />
                {(process.env.REACT_APP_TEST, process.env.REACT_APP_TEST2)}
            </div>
            </div>
        </div>
        {/* body */}
        <div className={`${styles.app__body} ${styles.body}`}>
            <div className={styles.body__container}>
            <div className={styles.body__row}>
                <Routes>
                    {/* <Route path="/" element={<Main />} /> */}
                    <Route path={ paths.createItem } element={
                        <RequirePermission role="ADMINISTRATOR">
                            <CreateItem />
                        </RequirePermission>
                    } />
                    <Route path={ paths.itemList } element={
                        <RequirePermission role="ADMINISTRATOR">
                            <ItemList />
                        </RequirePermission>
                    } />
                    <Route path={ `${paths.itemList}/:id` } element={
                        <RequirePermission role="ADMINISTRATOR">
                            <ItemDetail />
                        </RequirePermission>
                    } />
                    <Route path={ paths.authentication } element={<Authentication />} >
                        <Route path={ paths.registration } element={<Registration />} />
                        <Route path={ paths.login } element={<Login />} />
                        <Route path={ paths.logout } element={<Logout />} />
                    </Route>

                    <Route path={ paths.main } element={<Trade />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            </div>
        </div>
        </div>
    );
}

export default App;
