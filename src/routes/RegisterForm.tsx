import React, { FC, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { UserState, setAuth, setUser } from '../reducers/userReducer';
import AuthService from "../services/AuthService";

const RegisterForm: FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch();

    const handleRegistration = async () => {
        try{
            const response = await AuthService.registration(username, email, password);
            localStorage.setItem("token", response.data.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(response.data.user));
        }
        catch (error:any){
            console.log(error); //наверное так не стоит делать
        }
    };

    return(
        <div>
            <input
                onChange={e => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Username"
            />
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            <button onClick={handleRegistration}>Регистрация</button>
        </div>
    )
};

export default RegisterForm;