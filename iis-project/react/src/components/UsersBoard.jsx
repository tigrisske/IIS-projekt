import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from './Context';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserDetail from '../view/User';

export const UsersBoard = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const navigate = useNavigate();
    const { setNotification } = useStateContext();

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = async (page) => {
        try {
            const response = await axiosClient.get(`/users?page=${page}`, { withCredentials: true });
            console.log("users list");
            console.log(response.data);
            setUsers(response.data.data); // Assuming the user data is nested under 'data' key
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const onDeleteClick = async (userIdToDelete) => {
        try {
            const response = await axiosClient.delete(`/user/${userIdToDelete}`);
            console.log(response.data); // Log the response (optional)
            setUsers(users.filter((user) => user.id !== userIdToDelete));
        } catch (error) {
            console.error('Error deleting user:', error);
            setNotification('Error deleting user! Make sure the user has no events, categories, locations or reviews associated with them.', 'error');
        }
    };

    const onMoreInfoClick = async (userId) => {
        navigate(`/user/${userId}`);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= lastPage) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="centered-600px-container">
            <h2>List of Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <div className='left-start-aligned-flex-container'>
                            <span><strong>Name: </strong> {user.first_name} {user.last_name}</span>
                            <span><strong>Role:</strong> {user.role}</span>
                        </div>
                        <div className="horizontal-buttons end-aligned-row-flex-container">
                            <button onClick={() => onMoreInfoClick(user.id)} className="secondary-btn">
                                More Info
                            </button>
                            <button onClick={() => onDeleteClick(user.id)} className="delete-btn">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="pagination-container">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {lastPage}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === lastPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersBoard;
