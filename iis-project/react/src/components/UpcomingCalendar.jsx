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
import { useNavigate } from 'react-router-dom';

export const UpcomingCalendar = () => {
    const [myEventsList, setMyEventsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/myupcomingevents', { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setMyEventsList(response.data.map((event) => ({
                    id: event.id,
                    title: event.name,
                    start: new Date(event.start_date),
                    end: new Date(event.end_date),
                }
                )));
                console.log(myEventsList);
            })
            .catch(error => {
                console.log(error.response);
            });
    }, []);

    function handleClick(eventId) {
        navigate(`/event/${eventId}`);
    }

    return (
        <div style={{ margin: 'auto', width: '80%' }}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={myEventsList}
                eventClick={(clickInfo) => {
                    const eventId = clickInfo.event.id;
                    handleClick(eventId);
                }}
                height={'auto'}
            />
        </div>
    );
}

export default UpcomingCalendar;