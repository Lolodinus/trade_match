import React, {useEffect} from "react";
import { useAppSelector } from "../../hooks/redux";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { paths } from "../../const/link";

// Styles
import styles from "./Authentication.module.scss";


export default function Authentication() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if (user) return navigate(paths.logout);
        if(/registration/.exec(location.pathname)) return;
        navigate(paths.login);
    }, [user, location.pathname])

    return (
        <div className={ styles.authentication }>
            <Outlet/>
        </div>
    )
}