// React Component of scrollable list of all the users in the database
//
// This component is used in the Dashboard.jsx component

import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/Context';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        document.title = "Users List";
        axiosClient.post(
            "/users"
        )
            .then((response) => {
                setUsers(response.data.users);
            })
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