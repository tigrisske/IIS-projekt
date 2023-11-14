import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';

export const Event = () => {
    const [event, setEvent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id){
                const response = await axiosClient.get(`/event/${id}`);
                setEvent(response.data.event);
                console.log(response.data)
                }
            } catch (error) {
                console.log(`Error fetching event! ${error.response.data.message}`);
            }
        };

        fetchData();
    },[id] );

    return (
        <div>
            <h1>Event</h1>
            
            <p>Event name {event ? event.name : null}</p>
      
        </div>
    );
};
