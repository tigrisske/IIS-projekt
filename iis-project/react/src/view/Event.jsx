import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';

export const Event = () => {
    const [event, setEvent] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false); // Add this state variable
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await axiosClient.get(`/event/${id}`);
                    setEvent(response.data.event);
                    console.log(response.data);
                }
            } catch (error) {
                console.log(`Error fetching event! ${error.response.data.message}`);
            }
        };

        fetchData();
    }, [id]);

    const handleJoin = async (id) => {
        try {
            const response = await axiosClient.post(`/event/${id}/join`);
            console.log(response.data);
            setIsError(false);
            setErrorMessage('Successfully joined!');
        } catch (error) {
            console.log(`Error joining event! ${error.response.data.message}`);
            setIsError(true);
            setErrorMessage(`Error joining event! ${error.response.data.message}`);
        }
    };

    return (
        <div>
            <h1>Event</h1>
            <p>Event name {event ? event.name : null}</p>
            <button onClick={() => handleJoin(id)}>Join</button>

            {errorMessage && <div style={{ color: isError ? 'red' : 'green' }}>{errorMessage}</div>}
        </div>
    );
};
