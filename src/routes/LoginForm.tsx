import React, { FC, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { UserState, setAuth, setUser } from '../reducers/userReducer';
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";
import "../styles/loginForm.css";

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

    return(
        <div className="login-form-container">
          <h2 className="login-title">Вход в аккаунт</h2>
          <input
            className="login-input"
            onChange={e => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Имя пользователя"
          />
          <input
            className="login-input"
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Пароль"
          />
          <button className="login-button" onClick={handleLogin}>Войти</button>
          <Link className="register-link" to="/register">Создать аккаунт</Link>
        </div>
    )
};

export default LoginForm;