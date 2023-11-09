// React Component of scrollable list of all the users in the database
//
// This component is used in the Dashboard.jsx component

import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../components/Context';
import { Link } from 'react-router-dom';

const AdminToDo = () => {
    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);


    useEffect(() => {
        document.title = "Users List";
        axiosClient.get("/unconfirmed_events", { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setEvents(response.data.events);
            })
        // axiosClient.post(
        //     "/unconfirmed_locations"
        // )
        //     .then((response) => {
        //         setLocations(response.data.events);
        //     })
    }, []);

    return (
        <div>
            <h1>Todo</h1>
            <div className="">
                <h2>Events to confirm</h2>
                <div className="">
                    {events.map((event) => (
                        <div key={event.id} className="">
                            <p>{event.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="">
                <h2>Locations to confirm</h2>
                <div className="">
                    {locations.map((location) => (
                        <div key={location.id} className="">
                            <p>{location.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default AdminToDo;