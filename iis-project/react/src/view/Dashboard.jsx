
import React from "react"
import axiosClient from '../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';
import { useStateContext } from "../components/Context.jsx";
import UsersList from "../components/UsersList";
import AdminToDo from "../components/AdminToDo";

export const Dashboard = () => {
    const { user, checkLogin } = useStateContext();

    const navigate = useNavigate();

    function _user() {
        navigate('/user');
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
            <button onClick={_user}>My profile</button>
            <button onClick={create_event}>Create Event</button>
            <button onClick={create_location}>Create Location</button>
            <button onClick={create_category}>Create Category</button>
            <button onClick={checkLogin}>Verify Login</button>
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

export default Dashboard;