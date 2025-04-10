import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth, setUser, UserState } from '../reducers/userReducer';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { RootState } from '../store/store';
import React from 'react';

const PrivateRoute = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector((state: RootState) => state.user.isAuth);
    // const user = useSelector((state: UserState) => state.user);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AuthService.checkSession()
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setAuth(true));
                    dispatch(setUser(response.data));
                }
            })
            .catch(() => dispatch(setAuth(false)))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // добавить спинер
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;