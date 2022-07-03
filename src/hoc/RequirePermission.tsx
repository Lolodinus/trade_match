import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

// Types
import { Roles } from "../interface/tradeMatch/user"

interface IRequirePermissionProps {
    children: React.ReactElement;
    role: Roles;
};


export default function RequirePermission(props: IRequirePermissionProps) {
    const {children, role} = props;
    const { user } = useAppSelector(state => state.userReducer);

    if (!user || user.role !== role) return <Navigate to='/' state={{from: location}} />


    return children;
}