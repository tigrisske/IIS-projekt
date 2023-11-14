/**
 * @fileoverview This file exports the UpcomingCalendar React component.
 * 
 * This component is a calendar that displays all the upcoming events for a user.
 * 
 */
import axiosClient from '../axios-client';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export const UpcomingCalendar = () => {
    const [myEventsList, setMyEventsList] = useState([]);

    useEffect(() => {
        axiosClient.get('/myupcomingevents', { withCredentials: true })
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
        <div className='centered-600px-container'>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={false}
                events={myEventsList}
            />
        </div>
    );
}

export default UpcomingCalendar;