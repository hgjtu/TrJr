import React, { FC, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { UserState, setAuth, setUser } from '../reducers/userReducer';
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";

const LoginForm: FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try{
            const response = await AuthService.login(username, password);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.user.username);
            localStorage.setItem("role", response.data.user.role);
            dispatch(setAuth(true));
            dispatch(setUser(response.data.user));
        }
        catch (error:any){
            alert("ОШИБКА: такого пользователя не существует"); // очень сильное наебалово, надо сделать поумному
            console.log(error); //наверное так не стоит делать
        }
    };

    // const handleCheckAuth = async () => {
        
    // };

    // const handleLogout = async () => {
    //     try{
    //         const response = await AuthService.logout();
    //         localStorage.removeItem("token");
    //         dispatch(setAuth(false));
    //         dispatch(setUser(null));
    //     }
    //     catch (error:any){
    //         console.log(error); //наверное так не стоит делать
    //     }
    // };

    return(
        <div>
            <div>
            <input
                onChange={e => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Username"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            <button onClick={handleLogin}>Логин</button>
            </div>
            <Link to="/register">Создать аккаунт</Link>
        </div>
    )
};

export default LoginForm;