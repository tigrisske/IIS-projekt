
import React, { useState } from "react"
import axiosClient from '../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';
import { useStateContext } from "../context/Context";
import UsersList from "../components/UsersList";
import { useUserContext } from "../context/UserContext";
import AdminToDo from "../components/AdminToDo";

const Dashboard = () => {
    const {user, setUser} = useUserContext();
    console.log();
    const navigate = useNavigate();

    function logout() {
        axiosClient.post('/logout', { withCredentials: true })
            .then((response) => {
                console.log(response);
                navigate('/login');
            })
            .catch(error => {
                console.log(error);
                console.log("error"); return (<Navigate to="/login" />);
            });
    }


    // Return the dashboard page users list if the user is admin
    // Otherwise return the dashboard page for a single user
    return (
        <div>
      <h1>Welcome to the Dashboard, {user.first_name}!</h1>
      {/* Add content based on user roles */}
      {user.role === 'admin' && (
        <div>
          <h2>Admin Dashboard Content</h2>
          <UsersList />
          <AdminToDo/>
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

export default Dashboard