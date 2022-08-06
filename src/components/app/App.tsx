import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { authentication } from "../../store/reducers/user/ActionCreators";
import PATHS from "../../const/link";

// HOC
import { RequirePermission } from "../../hoc";

// Component
import { Header, NotificationProvider } from "../";

// Page
import PAGE from "../../pages";

// Styles
import styles from "./App.module.scss";

function App() {
    const dispatch = useAppDispatch();

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
                <div className={ styles.body__notification }>
                    <NotificationProvider />
                </div>
                <Routes>
                    <Route path={ PATHS.main } element={ <PAGE.Menu /> } />
                    {/* Admine Panel */}
                    <Route 
                        path={ PATHS.adminPanell } 
                        element={
                            <RequirePermission role="ADMINISTRATOR">
                                <PAGE.AdminePanel /> 
                            </RequirePermission>
                        }
                    >
                        <Route path={ PATHS.itemList } element={ <PAGE.ItemList /> } />
                        <Route path={ `${PATHS.itemList}/:id` } element={<PAGE.ItemDetail /> } />
                        <Route path={ `${PATHS.itemList}/${PATHS.createItem}` } element={ <PAGE.ItemCreate /> }/>
                        <Route path={ PATHS.traderList } element={ <PAGE.TraderList /> } />
                        <Route path={ `${PATHS.traderList}/${PATHS.createTrader}` } element={<PAGE.TraderCreate />} />
                        <Route path={ `${PATHS.traderList}/:id` } element={<PAGE.TraderDetail /> } />
                    </Route>
                    {/* Authentication */}
                    <Route path={ PATHS.authentication } element={<PAGE.Authentication />} >
                        <Route path={ PATHS.registration } element={<PAGE.Registration />} />
                        <Route path={ PATHS.login } element={<PAGE.Login />} />
                        <Route path={ PATHS.logout } element={<PAGE.Logout />} />
                    </Route>
                    {/* Game */}
                    <Route path={ PATHS.game } element={ <PAGE.Game/> }>
                        <Route path={ PATHS.trade } element={<PAGE.Trade />} />
                        <Route path={ PATHS.bag } element={<PAGE.Bag />} />
                    </Route>
                    
                    <Route path="*" element={<PAGE.NotFound />} />
                </Routes>
            </div>
            </div>
        </div>
        </div>
    );
}

export default App;
