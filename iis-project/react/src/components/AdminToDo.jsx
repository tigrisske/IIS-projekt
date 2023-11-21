// React Component of scrollable list of all the users in the database
//
// This component is used in the Dashboard.jsx component

import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

export const AdminToDo = () => {
    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        document.title = "Users List";
        axiosClient.get("/unconfirmed_events", { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setEvents(response.data.events);
            })
        axiosClient.get("/unconfirmed_locations")
            .then((response) => {
                console.log(response.data)
                setLocations(response.data);
            })
        axiosClient.get("/unconfirmed_categories")
            .then((response) => {
                console.log(response.data)
                setCategories(response.data);
            })
    }, []);

    const handleEventConfirm = async (eventId) => {
        try {
            const response = await axiosClient.post(`/confirm_event/${eventId}`);
            console.log(response.data); // Log the response (optional)
            setEvents(events.filter((event) => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle errors, show error messages, etc.
        }
    }

    const handleEventDelete = async (eventId) => {
        try {
            const response = await axiosClient.delete(`/events/delete/${eventId}`);
            console.log(response.data); // Log the response (optional)
            setEvents(events.filter((event) => event.id !== eventId));
        } catch (error) {
            console.error(error);
        }
    }

    const handleLocationConfirm = async (locationId) => {
        try {
            const response = await axiosClient.post(`/confirm_location/${locationId}`);
            console.log(response.data); // Log the response (optional)
            setLocations(locations.filter((location) => location.id !== locationId));
        } catch (error) {
            console.error('Error confirming location:', error);
            // Handle errors, show error messages, etc.
        }
    }

    const handleLocationDelete = async (locationId) => {
        try {
            const response = await axiosClient.delete(`/location/delete/${locationId}`);
            console.log(response.data); // Log the response (optional)
            setLocations(locations.filter((location) => location.id !== locationId));
        } catch (error) {
            console.error(error);
        }
    }

    const handleCategoryConfirm = async (categoryId) => {
        try {
            const response = await axiosClient.post(`/confirm_category/${categoryId}`);
            console.log(response.data); // Log the response (optional)
            setCategories(categories.filter((category) => category.id !== categoryId));
        } catch (error) {
            console.error('Error confirming category:', error);
            // Handle errors, show error messages, etc.
        }
    }

    const handleCategoryDelete = async (categoryId) => {
        try {
            const response = await axiosClient.delete(`/categories/delete/${categoryId}`);
            console.log(response.data); // Log the response (optional)
            setCategories(categories.filter((category) => category.id !== categoryId));
        } catch (error) {
            console.error(error);
        }
    }

    const handleEventOpen = async (eventId) => {

        navigate(`/event/${eventId}`);
    }


    return (
        <div>
            <h1>Todo</h1>
            <div className='centered-fullpage-container'>
                <div>
                    {events.length > 0 && <h2>Events to confirm:</h2> }
                    <ul >
                        {events.map((event) => (
                            <li key={event.id} className="">
                                <div className='left-start-aligned-flex-container'>
                                    <span><strong>Name: </strong> {event.name}</span>
                                    <span><strong>Date: </strong>{event.start_date} - {event.end_date}</span>
                                </div>
                                <div className='horizontal-buttons end-aligned-row-flex-container'>
                                    <button onClick={() => handleEventOpen(event.id)} className='secondary-btn'>
                                        More info
                                    </button>
                                    <button onClick={() => handleEventConfirm(event.id)} className='primary-btn'>
                                        Confirm
                                    </button>
                                    <button onClick={() => handleEventDelete(event.id)} className='delete-btn'>
                                        Delete
                                    </button>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                {locations.length > 0 && <h2>Locations to confirm:</h2> }
                    <ul >
                        {locations.map((location) => (
                            <li key={location.id} className="">
                                <div className='left-start-aligned-flex-container'>
                                    <span><strong>Name: </strong> {location.name}</span>
                                    <span><strong>Adress: </strong> {location.address_line_1}</span>
                                    {/* <span><strong>Date: </strong>{location.start_date} - {location.end_date}</span> */}
                                </div>
                                <div className='horizontal-buttons end-aligned-row-flex-container'>
                                    {/* <button onClick={() => handleEventOpen(location.id)} className='secondary-btn'> */}
                                        {/* More info */}
                                    {/* </button> */}
                                    <button onClick={() => handleLocationConfirm(location.id)} className='primary-btn'>
                                        Confirm
                                    </button>
                                    <button onClick={() => handleLocationDelete(location.id)} className='delete-btn'>
                                        Delete
                                    </button>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                {categories.length > 0 && <h2>Categories to confirm:</h2> }
                    <ul >
                        {categories.map((category) => (
                            <li key={category.id} className="">
                                <div className='left-start-aligned-flex-container'>
                                    <span><strong>Name: </strong> {category.name}</span>
                                </div>
                                <div className='horizontal-buttons end-aligned-row-flex-container'>
                                    {/* <button onClick={() => handleEventOpen(category.id)} className='secondary-btn'> */}
                                        {/* More info */}
                                    {/* </button> */}
                                    <button onClick={() => handleCategoryConfirm(category.id)} className='primary-btn'>
                                        Confirm
                                    </button>
                                    <button onClick={() => handleCategoryDelete(category.id)} className='delete-btn'>
                                        Delete
                                    </button>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default AdminToDo;