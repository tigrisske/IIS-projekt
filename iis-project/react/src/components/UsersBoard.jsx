import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from './Context';
import { Link } from 'react-router-dom';

export const UsersBoard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

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
      const response = await axiosClient.delete(`/users/${userIdToDelete}`);
      console.log(response.data); // Log the response (optional)
      setUsers(users.filter((user) => user.id !== userIdToDelete));
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle errors, show error messages, etc.
    }
  };

  const onMoreInfoClick = async (userId) => {
    try {
      const response = await axiosClient.get(`/users/${userId}`);
      console.log(response.data); // Log the response (optional)
    } catch (error) {
      console.error('Error getting user:', error);
      // Handle errors, show error messages, etc.
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="centered-600px-container">
      <h2>List of Users</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div className='left-start-aligned-flex-container'>
              <span><strong>Name: </strong> {user.first_name} {user.last_name}</span>
              <span><strong>Role:</strong> {user.role}</span>
            </div>
            <div className="end-aligned-row-flex-container">
              <button onClick={() => onDeleteClick(user.id)} className="delete-button">
                Delete
              </button>
              <button onClick={() => onMoreInfoClick(user.id)} className="more-info-button">
                More Info
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
