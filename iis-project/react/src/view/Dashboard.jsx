
import React, { useState } from "react"
import axiosClient from '../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import { useStateContext } from "../components/Context.jsx";
import UsersList from "../components/UsersList";
import AdminToDo from "../components/AdminToDo";


export default function Dashboard() {
    const { user } = useStateContext();

    const navigate = useNavigate();

    const {token, setToken} = useStateContext();
    function logout(){
        console.log("token before logging out:" ,token);
        axiosClient.post('/logout', { withCredentials: true })
        .then(  (response) => {console.log(response);
        setToken(null);
        console.log("token removed");
        localStorage.removeItem('ACCESS_TOKEN');
        console.log(token);
        
        // navigate('/login'); 
    })
        .catch(error => {console.log(error);
        console.log("error"); return (<Navigate to="/login" />);
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
    function _user() {
        navigate('/user');
    }
    function events() {
        navigate('/events');
    }
    function create_event() {
        navigate('/createevent');
    }
    function create_location() {
        navigate('/createlocation');
    }
    function create_category() {
        navigate('/createcategory');
    }

    return (
        <div>
            <h1>Welcome to the Dashboard, {user.first_name}!</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={_user}>My profile</button>
            <button onClick={create_event}>Create Event</button>
            <button onClick={create_location}>Create Location</button>
            <button onClick={create_category}>Create Category</button>
            <button onClick={events}>Events</button>
            <button onClick={check}>Verify Login</button>
            {user.role === 'admin' && (
                <div>
                    <h2>Admin Dashboard Content</h2>
                    <UsersList />
                    <AdminToDo />
                </div>
            )}
            {user.role === 'member' && (
                <div>
                    <h2>Member Dashboard Content</h2>
                    {/* Add user-specific components here */}
                    <UsersList />
                    <p>Hello</p>
                </div>
            )}
        </div>
    )

}