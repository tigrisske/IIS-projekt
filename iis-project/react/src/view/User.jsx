import React, { useState } from 'react';
import axiosClient from '../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';

const User = () => {
    return (
        <div>
            <div>
                first name
                <input
                type="name"
                placeholder="tvoje meno brasko"
            />
            </div>
            <div>
                last name
                <input
                type="lastname"
                placeholder="tvoje priezvisko brasko"
            />
            </div>
            <div>
                email adress
                <input
                type="email"
                placeholder="tvoj email brasko"
            />
            </div>
            <div>
                password
                <input
                type="password"
                placeholder="dobre brasko co je zle"
            />
            </div>
            <div>
                phone number
                <input
                type="email"
                placeholder="0915369639"
            />
            </div>
            <div>
                date of birth
                <input
                type="email"
                placeholder="vcera"
            />
            </div>
            <button >cancel</button>
            <button >save</button>
        </div>
    );
};

export default User;
