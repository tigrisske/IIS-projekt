import React, { useState } from 'react';
import { useStateContext } from "../components/Context.jsx";
import { Navigate, useNavigate } from 'react-router-dom';


export const Login = () => {

    const { login, checkLogin } = useStateContext();

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSignIn = async () => {
        login(credentials);
    }

    function check() {
        checkLogin();
    }

    function handleLogout() {
        logout();
    }

    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <div className='input'>
                <button onClick={handleSignIn}>Sign In</button>
            </div>
        </div>
    );
};

export default Login;
