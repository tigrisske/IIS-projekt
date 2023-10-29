import React, { useState } from 'react';
import axiosClient from '../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: ''});
    const navigate = useNavigate();
    const {user, setUser} = useUserContext();
    console.log(user)
    console.log(setUser)
    const handleSignIn = async () => {
            axiosClient.post('/login', credentials)
            .then( (response) => {
                console.log('Login response');
                setUser(response.data.user);
                //navigate to dashboard and pass user object
                navigate('/dashboard', { state: { user: response.data.user } }); 
            })
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
