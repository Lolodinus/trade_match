import React, {useEffect} from "react";
import { useAppSelector } from "../../hooks/redux";
import { useNavigate, Outlet, useLocation, Navigate } from "react-router-dom";

// Styles
import styles from "./Authentication.module.scss";


export default function Authentication() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if (user) return navigate("logout");
        if(/registration/.exec(location.pathname)) return;
        navigate("login");
    }, [user, location.pathname])

    return (
        <div className={ styles.authentication }>
            <Outlet/>
        </div>
    )
}