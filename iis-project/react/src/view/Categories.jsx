import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../components/Context';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState('');
    const { setNotification } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories(currentPage);
    }, [currentPage]);

    const fetchCategories = async (currentPage) => {
        try {
            const response = await axiosClient.get(`/categories?page=${currentPage}`, { withCredentials: true });
            setCategories(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const onDeleteClick = async (categoryToDelete) => {
        try {
            const response = await axiosClient.delete(`/category/${categoryToDelete}`);
            setCategories(categories.filter((category) => category.id !== categoryToDelete));
        } catch (error) {
            console.error('Error deleting category:', error);
            setNotification("Error deleting category. Make sure this category has no subcategories and that there are no events assigned to this category before deleting.", 'error');
        }
    };

    const onEditClick = (categoryId, categoryName) => {
        setEditingCategoryId(categoryId);
        setEditedCategoryName(categoryName);
    };

    const onCancelEditClick = () => {
        setEditingCategoryId(null);
        setEditedCategoryName('');
    };

    const onSaveEditClick = async (categoryId) => {
        axiosClient.post(`update_category/${categoryId}`, { name: editedCategoryName })
        .then((response) => {
            console.log(response);
            setEditingCategoryId(null);
            setEditedCategoryName('');
            fetchCategories(currentPage);
        })
        .catch((error) => {
            console.log(error);
        });

        
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= lastPage) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="centered-600px-container">
            <h2>List of Categories</h2>
            <button onClick={() => navigate('/createcategory')} className="primary-btn">Create category</button>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <div className='left-start-aligned-flex-container'>
                            {editingCategoryId === category.id ? (
                                <>
                                    <span>
                                        <strong>Name: </strong>
                                        <input
                                            type="text"
                                            value={editedCategoryName}
                                            onChange={(e) => setEditedCategoryName(e.target.value)}
                                        />
                                    </span>
                                    <span>
                                        <strong>Parent category: </strong> {category.parent_name}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span>
                                        <strong>Name: </strong> {category.name}
                                    </span>
                                    <span>
                                        <strong>Parent category: </strong> {category.parent_name}
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="horizontal-buttons end-aligned-row-flex-container">
                            {editingCategoryId === category.id ? (
                                <>
                                    <button onClick={() => onSaveEditClick(category.id)} className="primary-btn">
                                        Save
                                    </button>
                                    <button onClick={onCancelEditClick} className="cancel-btn">
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => onEditClick(category.id, category.name)} className="edit-btn">
                                    Edit
                                </button>
                            )}
                            <button onClick={() => onDeleteClick(category.id)} className="delete-btn">
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

export default Categories;
