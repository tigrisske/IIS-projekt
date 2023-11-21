import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';

export const UserDetail = () => {
    const [user, setUser] = useState(null);
    const [newRole, setNewRole] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [confirmedRole, setConfirmedRole] = useState(null);
    const { userId } = useParams();
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const response = await axiosClient.get(`/user/${userId}`);
                    setUser(response.data);
                    setConfirmedRole(response.data.role);
                    setNewRole(response.data.role);
                }
            } catch (error) {
                console.log(`Error fetching user! ${error.response.data.message}`);
            }
        };

        fetchData();
    }, [userId]);


    const handleRoleChange = (e) => {
        setNewRole(e.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setNewRole(user.role);
        setIsEditing(false);
    };

    /* Apply changes to the user's role */
    const handleApplyChanges = () => {
        
        setConfirmedRole(newRole);
        try {
            console.log(`Updating user ${userId} with new role ${newRole}`)
            axiosClient.put(`/user/${userId}/update-role`, { role: newRole });
        } catch (error) {
            console.log(`Error updating user role! ${error.response.data.message}`);
        } 
        setIsEditing(false);
    };

    return (
        <div>
            {user ? (
                <div>
                    <h2>User Information</h2>
                    <p>First Name: {user.first_name}</p>
                    <p>Last Name: {user.last_name}</p>
                    <p>Email: {user.email}</p>
                    <p>Current Role: {isEditing ? (
                        <select value={newRole} onChange={handleRoleChange}>
                            <option value="admin">Admin</option>
                            <option value="member">Member</option>
                            <option value="moderator">Moderator</option>
                        </select>
                    ) : (
                        confirmedRole
                    )}</p>
                    {isEditing ? (
                        <div>
                            <button onClick={handleApplyChanges}>Apply</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    ) : (
                        <button onClick={handleEditClick}>Change Role</button>
                    )}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div >
    );
};

export default UserDetail;
