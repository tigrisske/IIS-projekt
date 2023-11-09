import React, { useState } from 'react';
import axiosClient from '../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';
import { useStateContext } from "../components/Context.jsx";
import '../components/styles/Main.css';


const Login = () => {

    const { setUser, setToken } = useStateContext()

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const handleSignIn = async () => {
        axiosClient.post('/login', credentials)
        .then( (response) => {
            console.log('Login response');
            console.log(response);
            setUser(response.data.user);
            setToken(true);
            //navigate to dashboard and pass user object
            navigate('/dashboard', { state: { user: response.data.user } }); 
        }).catch(error => {
            console.log(error.response.data);
        });
    }

    function check() {
        axiosClient.post('/auth', { withCredentials: true })
            .then((response) => { console.log(response); })
            .catch(error => {
                console.log(error);
                console.log("error"); return (<Navigate to="/login" />);
            });
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
                <button onClick={check}>Verify Login</button>
            </div>
        </div>
    );
};

export default Login;
