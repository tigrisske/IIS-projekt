import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../components/Context';
import { Link, Navigate, useNavigate } from 'react-router-dom';


export const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const { setNotification } = useStateContext();
    const navigate = useNavigate();


    useEffect(() => {
        fetchLocations(currentPage);
    }, [currentPage]);

    const fetchLocations = async (currentPage) => {
        try {
            const response = await axiosClient.get(`/locations?page=${currentPage}`, { withCredentials: true });
            console.log("locations list");
            console.log(response.data);
            setLocations(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };


    const onDeleteClick = async (locationToDelete) => {
        try {
            const response = await axiosClient.delete(`/location/${locationToDelete}`);
            console.log(response.data); // Log the response (optional)
            setLocations(locations.filter((location) => location.id !== locationToDelete));
        } catch (error) {
            console.error('Error deleting location:', error);
            setNotification("Error deleting location. Make sure there are no events assigned to this location before deleting.", 'error');
        }
    };

    const onMoreInfoClick = async (locationId) => {
        navigate(`/location/${locationId}`);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= lastPage) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="centered-600px-container">
            <h2>List of Locations</h2>
            <ul>
                {locations.map((location) => (
                    <li key={location.id}>
                        <div className='left-start-aligned-flex-container'>
                            <span><strong>Name: </strong> {location.name}</span>
                            <span><strong>Address: </strong> {location.address_line_1}</span>
                            <span><strong>City: </strong> {location.city}</span>
                            <span><strong>Zip code: </strong> {location.zip_code}</span>
                            <span><strong>Country: </strong> {location.country}</span>
                        </div>
                        <div className="horizontal-buttons end-aligned-row-flex-container">
                            <button onClick={() => onMoreInfoClick(location.id)} className="secondary-btn">
                                MoreInfo
                            </button>
                            <button onClick={() => onDeleteClick(location.id)} className="delete-btn">
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

export default Locations;