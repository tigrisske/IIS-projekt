import React, { useState } from 'react';
import axiosClient from '../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';
import {useStateContext} from "../components/Context.jsx";


const Login = () => {
    
      const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)
    
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const handleSignIn = () => {
            axiosClient.post('/login', credentials)
            .then( (response) => {
                console.log("toto sa deje brasko")
                setToken('true');
                setUser('hello');
                console.log(response);
                navigate('/dashboard');})
            .catch(error => {console.log(error); return (<Navigate to="/dashboard" />);});
        }

    function check(){
        axiosClient.post('/auth', { withCredentials: true })
        .then(  (response) => {console.log(response);})
        .catch(error => {console.log(error);
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
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={check}>Verify Login</button>
        </div>
    );
};

export default Login;
