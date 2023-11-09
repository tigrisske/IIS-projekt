import React, { useState,useRef } from 'react';
import axiosClient from '../axios-client';
import {useStateContext} from "../components/Context.jsx";
import { Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const { setUser, setToken } = useStateContext()
    const nameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    function handleSignIn(event) {
        event.preventDefault();
        const request = {
            first_name: nameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient.post('/signin', request)
            .then((response) => {
                setToken('true');
                console.log(response);
                navigate('/dashboard');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <input
                type="text"
                ref={nameRef}
                placeholder="Name"
                // value={credentials.name}
                // onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
            />
            <input
                type="text"
                ref={lastNameRef}
                placeholder="last name"
                // value={credentials.password}
                // onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <input
                type="email"
                ref={emailRef}
                placeholder="Email"
                // value={credentials.email}
                // onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="password"
                ref={passwordRef}
                placeholder="Password"
                // value={credentials.password}
                // onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <input
                type="password"
                ref={passwordConfirmationRef}
                placeholder="Password Confirmation"
                // value={credentials.passwordConfirm}
                // onChange={(e) => setCredentials({ ...credentials, passwordConfirm: e.target.value })}
            />
            <button onClick={handleSignIn} >Sign In</button>
        </div>
    );
};

export default SignUp;
