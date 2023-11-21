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

    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    const startTime = dateObject.toLocaleTimeString('en-GB', timeOptions);

    const startDate = `${day}-${month}-${year}`;

    // Limit the description to a fixed number of characters
    const max_desc_len = 230;
    const max_name_len = 45;
    const limitedDesc =
        props.description.length > max_desc_len
            ? `${props.description.substring(0, max_desc_len)}...`
            : props.description;

        const limitedName =
        props.name.length > max_name_len
            ? `${props.name.substring(0, max_name_len)}...`
            : props.name;

    function handleClick() {
        navigate(`/event/${props.id}`);
    }

    return (
        <div className='event'>
        <div onClick={handleClick} className="event-name">
            <h1 className={props.name.length > 15 ? "long-name" : "name"}>{limitedName}</h1>
            <p>{limitedDesc}</p>
            
        </div>
        <div className="event-info">
            <p>{startDate} {startTime}</p>
            {props.capacity !== 99999999 ? (
                        <p>{props.joined_count}/{props.capacity}</p>
                    ) : (
                        <p>Unlimited capacity</p>
                    )}
            <p>{props.location_name}</p>

        </div>
        </div>
    );
}

export default Event;
