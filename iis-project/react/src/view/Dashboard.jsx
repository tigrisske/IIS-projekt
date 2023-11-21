
import React from "react"
import axiosClient from '../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';
import { useStateContext } from "../components/Context.jsx";
import AdminToDo from "../components/AdminToDo";
import { Link } from "react-router-dom";

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
    function manage_categories() {
        navigate('/categories');
    }
    function manage_locations() {
        navigate('/locations');
    }


    return (
        <div>
            <h1>Welcome to the Dashboard, {user.name}!</h1>
            <button onClick={_user}>My profile</button>
            <button onClick={checkLogin}>Verify Login</button>
            {user.role === 'admin' && (
                <div>
                    <h2>Admin Dashboard Content</h2>
                    <button onClick={manage_categories}>Manage categories</button>
                    <button onClick={manage_locations}>Manage locations</button>
                    <AdminToDo />
                </div>
            )}
            {user.role === 'moderator' && (
                <div>
                    <h2>Moderator Dashboard Content</h2>
                    <AdminToDo />
                </div>
            )}
            {user.role === 'member' && (
                <div>
                    <h2>Member Dashboard Content</h2>
                    {/* Add user-specific components here */}
                    <p>Hello</p>
                </div>
            )}
        </div>
    )

}

export default Dashboard;