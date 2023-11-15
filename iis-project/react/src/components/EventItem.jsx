import './styles/Event.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function Event(props) {
    const navigate = useNavigate(); 
    const dateString = props.start_date;
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; 
    const day = dateObject.getDate();

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const startDate = `${day}-${month}-${year}`;
    const startTime= ` ${hours}:${minutes}`;

    function handleClick() {
        navigate(`/event/${props.id}`);
    }

    return (
        <div onClick={handleClick} className="event">
            <h1>{props.name}</h1>
            <p>{startDate}</p>
            <p>{startTime}</p>
            <p>Capacity: {props.joined_count}/{props.capacity}</p>
            <p>Description: {props.description}</p>
            <p>Id {props.id}</p>
            <p>Location id(TODO):{props.location_id}</p>
        </div>
    );
}

export default Event;
