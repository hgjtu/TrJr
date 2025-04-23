import React, { FC, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { UserState, setAuth, setUser } from '../reducers/userReducer';
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";
import "../styles/registerForm.css";

const RegisterForm: FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const dispatch = useDispatch();

    const handleRegistration = async () => {
        try{
            const response = await AuthService.registration(username, email, password);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.user.username);
            localStorage.setItem("role", response.data.user.role);
            dispatch(setAuth(true));
            dispatch(setUser(response.data.user));
        }
        catch (error:any){
            console.error(error); //наверное так не стоит делать
        }
    };

    return(
        <div className="register-form-container">
          <h2 className="register-title">Создать аккаунт</h2>
          <input
            className="register-input"
            onChange={e => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Имя пользователя"
          />
          <input
            className="register-input"
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
          />
          <input
            className="register-input"
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Пароль"
          />
          <button className="register-button" onClick={handleRegistration}>Зарегистрироваться</button>
          <Link className="login-link-register" to="/login">Уже есть аккаунт? Войти</Link>
        </div>
      )
};

export default RegisterForm;