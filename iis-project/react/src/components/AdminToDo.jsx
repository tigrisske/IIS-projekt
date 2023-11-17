// React Component of scrollable list of all the users in the database
//
// This component is used in the Dashboard.jsx component

import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

export const AdminToDo = () => {
    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        document.title = "Users List";
        axiosClient.get("/unconfirmed_events", { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setEvents(response.data.events);
            })
        axiosClient.post(
            "/unconfirmed_locations"
        )
            .then((response) => {
                setLocations(response.data.events);
            })
    }, []);

    const handleEventConfirm = async (eventId) => {
        try {
            const response = await axiosClient.post("/confirm_event", { event_id: eventId });
            console.log(response.data); // Log the response (optional)
            setEvents(events.filter((event) => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle errors, show error messages, etc.
        }
    }

    const handleEventDelete = async (eventId) => {
        try {
            const response = await axiosClient.delete(`/events/${eventId}`);
            console.log(response.data); // Log the response (optional)
            setEvents(events.filter((event) => event.id !== eventId));
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
                    <h2>Events to confirm</h2>
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
                    <h2>Locations to confirm</h2>
                    <div className="">
                        {locations.map((location) => (
                            <div key={location.id} className="">
                                <p>{location.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2>Categories to confirm</h2>
                    <div className="">
                        {locations.map((location) => (
                            <div key={location.id} className="">
                                <p>{location.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AdminToDo;