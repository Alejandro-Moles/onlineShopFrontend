import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const AppProtectedRoutes = ({
    activate,
    redirectPath= '/login'
}) => {

    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
        return <Navigate to={redirectPath} replace />
    }

    return <Outlet/>

}

export default AppProtectedRoutes;