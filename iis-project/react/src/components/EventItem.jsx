import './styles/Event.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axiosClient from '../axios-client';

function Event(props) {
    const navigate = useNavigate(); // Get the navigate function

    function handleClick() {
        navigate(`/event/${props.id}`);
    }

    return (
        <div onClick={handleClick} className="event">
            <h1>{props.name}</h1>
            <p>Start date: {props.start_date}</p>
            <p>Capacity: {props.capacity}</p>
            <p>Description: {props.description}</p>
            <p>Id {props.id}</p>
            <p>Location id(TODO):{props.location_id}</p>
        </div>
    );
}

export default Event;
