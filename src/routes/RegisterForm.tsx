import React, { FC, useState } from "react";

const RegisterForm: FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
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
                type="text"
                placeholder="Email"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            <button>Регистрация</button>
        </div>
    )
};

export default RegisterForm;