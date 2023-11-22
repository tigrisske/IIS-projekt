import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../components/Context';
import { set } from 'date-fns';

export const LocationDetail = () => {
    const [location, setLocation] = useState(null);
    const [isEditingLocation, setIsEditing] = useState(false);
    const [editedLocation, setEditedLocation] = useState({}); // State to hold edited location data
    const { locationId } = useParams();
    const { setNotification } = useStateContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (locationId) {
                    const response = await axiosClient.get(`/location/${locationId}`);
                    setLocation(response.data);
                    setEditedLocation(response.data); // Initialize editedLocation with fetched data
                }
            } catch (error) {
                console.log(`Error fetching location! ${error}`);
            }
        };

        fetchData();
    }, [locationId]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setEditedLocation(location); // Reset editedLocation to original location data
        setIsEditing(false);
        setNotification('Changes canceled', 'success')
    };

    const handleApplyChanges = async () => {
        // validate editedLocation data
        if (editedLocation.name === '' || editedLocation.address_line_1 === '' || editedLocation.city === '' || editedLocation.zip_code === '' || editedLocation.country === '') {
            setNotification('Please fill in all required fields', 'error');
            return;
        }
        await axiosClient.put(`/location/${locationId}`, editedLocation)
            .then((response) => {
                console.log(response.data.message);
                setLocation(response.data.location);
                setIsEditing(false);
                setNotification(response.data.message, 'success')
            })
            .catch((error) => {
                setNotification('Error', 'error');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedLocation({
            ...editedLocation,
            [name]: value,
        });
    };

    return (
        <div>
            {location ? (
                <div className="centered-600px-container">
                    {isEditingLocation ? (
                        <div className="full-width">
                            <h2>Editing location: {location.name}</h2>
                            <form className='left-start-aligned-flex-container'>
                                <label className='required' htmlFor="name">Location Title</label>
                                <input type="text" id="name" name="name" value={editedLocation.name} onChange={handleInputChange} />
                                <label className='required' htmlFor="address_line_1">Address Line 1</label>
                                <input type="text" id="address_line_1" name="address_line_1" value={editedLocation.address_line_1} onChange={handleInputChange} />
                                <label htmlFor="address_line_2">Address Line 2</label>
                                <input type="text" id="address_line_2" name="address_line_2" value={editedLocation.address_line_2} onChange={handleInputChange} />
                                <label className='required' htmlFor="city">City</label>
                                <input type="text" id="city" name="city" value={editedLocation.city} onChange={handleInputChange} />
                                <label className='required' htmlFor="zip_code">Zip Code</label>
                                <input type="text" id="zip_code" name="zip_code" value={editedLocation.zip_code} onChange={handleInputChange} />
                                <label className='required' htmlFor="country">Country</label>
                                <input type="text" id="country" name="country" value={editedLocation.country} onChange={handleInputChange} />
                                <label htmlFor="description">Description</label>
                                <textarea id="description" name="description" value={editedLocation.description} onChange={handleInputChange} />
                            </form>
                            <button className='btn-primary' onClick={handleApplyChanges}>Apply Changes</button>
                            <button className='btn-secondary' onClick={handleCancelClick}>Cancel</button>
                        </div>
                    ) : (
                        <div className="centered-600px-container">
                            <div className='left-start-aligned-flex-container'>
                                <h2>{location.name}</h2>
                                <span><strong>Address: </strong> {location.address_line_1}, {location.address_line_2}</span>
                                <span><strong>City:</strong> {location.city}, {location.zip_code}, {location.country} </span>
                                <span><strong>Description:</strong> {location.description}</span>
                            </div>
                            <div className='end-aligned-row-flex-container'>
                                <button className='btn-primary' onClick={() => handleEditClick()}>Edit</button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading location data...</p>
            )
            }
        </div >
    );
};

export default LocationDetail;

