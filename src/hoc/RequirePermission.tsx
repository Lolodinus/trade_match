import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PATHS from "../const/link";
import { useAppSelector, useAppDispatch } from "../hooks/redux";

// Types
import { Roles } from "../interface/tradeMatch/user"
import { sendNotification } from "../store/reducers/notification/ActionCreators";

interface IRequirePermissionProps {
    children: React.ReactElement;
    role: Roles;
};

export default function RequirePermission(props: IRequirePermissionProps) {
    const {children, role} = props;
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if (!user || user.role !== role) {
            dispatch(sendNotification("Access denied", "INFO"))
            navigate(PATHS.main);
        } else {
            setLoading(false);
        }
    }, [])

    return loading ? <div> Loading... </div> : children;
}