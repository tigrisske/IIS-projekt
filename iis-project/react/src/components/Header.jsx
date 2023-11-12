import React, { useState, useEffect } from 'react';
import './styles/Header.css';
import axiosClient from '../axios-client';
import { useStateContext } from "./Context.jsx";
import { Navigate, useNavigate } from 'react-router-dom';

const GuestHeader = () => {

    const { logout } = useStateContext()
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');

    }

    const handleSignIn = () => {
        navigate('/login');
    }

    return (
        <div className="guest-header">
            <p className="header-text"><a href="/dashboard">Dashboard</a></p>
            <p className="header-text"><a href="/events">Events</a></p>
            <p className="header-text"><a href="/user">My profile  </a></p>
            <p className="header-text"><a onClick={handleLogout} href="/login">Logout  </a></p>
        </div>
    );
};


export default GuestHeader;
