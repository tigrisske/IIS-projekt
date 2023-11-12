// React Component of scrollable list of all the users in the database
//
// This component is used in the Dashboard.jsx component

import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../components/Context';
import { Link } from 'react-router-dom';

export const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosClient.get('/users', { withCredentials: true })
            .then((response) => {
                console.log("users list");
                console.log(response.data);
                setUsers(response.data.users);
            }).catch(error => {
                console.log(error.response.data);
            });
    }, []);

    return (
        <div className="users-list">
            <h1>Users</h1>
            <div className="users-list-container">
                {users.map((user) => (
                    <div key={user.id} className="user-card">
                        <Link to={`/users/${user.id}`}>
                            <h3>{user.first_name} {user.last_name}</h3>
                        </Link>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UsersList;