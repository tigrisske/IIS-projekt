import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';

export const Event = () => {
    const [event, setEvent] = useState(null);
    const [location, setLocation] = useState(null); 

    const [isJoined, setIsJoined] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false); // Add this state variable
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await axiosClient.get(`/event/${id}`);
                    setEvent(response.data.event);
                    setIsJoined(response.data.has_joined);
                    setLocation(response.data.location);
                    console.log(response.data);
                }
            } catch (error) {
                console.log(`Error fetching event! ${error.response.data.message}`);
            }

        };

        fetchData();
    }, [id, isJoined]);

    const handleJoin = async (id) => {
        try {
            const response = await axiosClient.post(`/event/${id}/join`);
            console.log(response.data);
            setIsError(false);
            // setErrorMessage('Successfully joined!');
            setIsJoined(true);
        } catch (error) {
            console.log(`Error joining event! ${error.response.data.message}`);
            setIsError(true);
            setErrorMessage(`Error joining event! ${error.response.data.message}`);
        }
    };

    return (
        <div>
            <div>{event ?
                <div> 
                    <h1>{event.name}</h1> 
                    <p>Starting: {event.start_date}</p> 
                    <p>End: {event.end_date}</p> 
                    <p>Description: {event.description}</p>
                    <p>Capacity:{event.joined_count}/{event.capacity}</p>
                    <p>{location.name}</p> 
                </div>
                : 
                <p>loading event data...</p>}</div>
            { isJoined ?  isJoined && <h3 style={{color: 'green'}}>You have joined this event.</h3> : <button onClick={() => handleJoin(id)}>Join</button>}
            

            {errorMessage && <div style={{ color: isError ? 'red' : 'green' }}>{errorMessage}</div>}

        </div>
    );
};
