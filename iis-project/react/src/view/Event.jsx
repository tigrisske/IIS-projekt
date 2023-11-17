import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';
import Reviews from '../components/Reviews';

export const Event = () => {
    const [event, setEvent] = useState(null);
    const [location, setLocation] = useState(null);
    const [isJoined, setIsJoined] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const { eventId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (eventId) {
                    const response = await axiosClient.get(`/event/${eventId}`);
                    setEvent(response.data.event);
                    setIsJoined(response.data.has_joined);
                    setLocation(response.data.location);
                }
            } catch (error) {
                console.log(`Error fetching event! ${error.response.data.message}`);
            }
        };

        fetchData();
    }, [eventId, isJoined]);

    const handleJoin = async (id) => {
        try {
            const response = await axiosClient.post(`/event/${id}/join`);
            setIsError(false);
            setIsJoined(true);
        } catch (error) {
            setIsError(true);
            setErrorMessage(`Error joining event! ${error.response.data.message}`);
        }
    };

    return (
        <div className='centered-600px-container ' style={{ textAlign: 'center' }}>
            {event ? (
                <div>
                    <h1>{event.name}</h1>
                    <p>Starting: {event.start_date}</p>
                    <p>End: {event.end_date}</p>
                    <p>Description: {event.description}</p>
                    <p>Capacity:{event.joined_count}/{event.capacity}</p>
                    <p>{location.name}</p>
                    {new Date(event.start_date) < new Date() ? (
                        <Reviews eventId={eventId} />
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <p>Loading event data...</p>
            )}

            {isJoined ? (
                <h3 style={{ color: 'green' }}>You have joined this event.</h3>
            ) : (
                <button onClick={() => handleJoin(eventId)} className='primary-btn'>Join</button>
            )}

            {errorMessage && (
                <div style={{ color: isError ? 'red' : 'green' }}>{errorMessage}</div>
            )}
        </div>
    );
};

export default Event;
