
import React, { useState,useRef } from 'react';
import axiosClient from '../axios-client';

const SignUp = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const request = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                password_confirmation: passwordConfirmationRef.current.value,
            };
            const response = axiosClient.post('/signin', request);
            console.log('toto je response ty coco');
            console.log(response);

            // Handle successful sign in response (store session id in cookies if needed)
        } catch (error) {
            console.log('toto je error ty coco');
            console.log(error); 

        }
    };

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
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default SignUp;
