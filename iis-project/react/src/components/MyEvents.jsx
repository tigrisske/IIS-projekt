/**
 * @fileoverview MyEvents component
 * 
 * This component displays all the events that the user created and can manage them.
 */
import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from "./Context.jsx";
import { Link } from 'react-router-dom';

export const MyEvents = () => {
    const [myEventsList, setMyEventsList] = useState([]);

    useEffect(() => {
        axiosClient.get('/myevents', { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setMyEventsList(response.data.map((event) => ({
                    id: event.id,
                    title: event.name,
                    date: new Date(event.start_date),
                }
                )));
            })
            .catch(error => {
                console.log(error.response);
            });
    }, []);

    return (
        <div>
            <h1>My Events</h1>
            <div className="events-list-container">
                {myEventsList.map((event) => (
                    <div key={event.id} className="event-card">
                        <Link to={`/events/${event.id}`}>
                            <h3>{event.title}</h3>
                        </Link>
                        <p>{event.date.toString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyEvents;