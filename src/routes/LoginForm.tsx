import React, { FC, useState } from "react";

const LoginForm: FC = () => {
    const [username, setUsername] = useState<string>("");
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
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            <button>Логин</button>
        </div>
    )
};

export default LoginForm;