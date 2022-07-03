import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { authentication } from "../../store/reducers/ActionCreators";

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
    Logout
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
                    <Route path="/" element={<Main />} />
                    <Route path="create" element={
                        <RequirePermission role="ADMINISTRATOR">
                            <CreateItem />
                        </RequirePermission>
                    } />
                    <Route path="list" element={
                        <RequirePermission role="ADMINISTRATOR">
                            <ItemList />
                        </RequirePermission>
                    } />
                    <Route path="list/:id" element={
                        <RequirePermission role="ADMINISTRATOR">
                            <ItemDetail />
                        </RequirePermission>
                    } />
                    <Route path="authentication" element={<Authentication />} >
                        <Route path="registration" element={<Registration />} />
                        <Route path="login" element={<Login />} />
                        <Route path="logout" element={<Logout />} />
                        <Route path="registration" element={<Registration />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            </div>
        </div>
        </div>
    );
}

export default App;
