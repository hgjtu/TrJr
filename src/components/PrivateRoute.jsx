import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/AuthService';

const PrivateRoute = () => {
    const [isAuthenticated, setAuth] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await AuthService.checkLogin();
            if(response.status == 200) setAuth(true);
            else setAuth(false);
            } catch (error) {
                console.log(error); //наверное так не стоит делать
            }
        };
        
        fetchData();
        }, []);
        
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;