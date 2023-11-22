import React from 'react';
import { useNavigate } from 'react-router-dom';

function Event(event) {
    const navigate = useNavigate();

    // Function to get time and date from ISO string
    function getDate(isoString) {
        const date = new Date(isoString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const timeOptions = { hour: 'numeric', minute: 'numeric' };
        const startTime = date.toLocaleTimeString('en-GB', timeOptions);
        const formattedDate = `${day}.${month}.${year} ${startTime}`;
        return formattedDate;
    }

    // Limit the description to a fixed number of characters
    const max_desc_len = 230;
    const max_name_len = 45;
    const limitedDesc =
        event.description.length > max_desc_len
            ? `${event.description.substring(0, max_desc_len)}...`
            : event.description;

    const limitedName =
        event.name.length > max_name_len
            ? `${event.name.substring(0, max_name_len)}...`
            : event.name;

    function handleClick() {
        navigate(`/event/${event.id}`);
    }

    return (
        <div className='event-card'>
            <div onClick={handleClick}>
                <img src='../../../public/background-image.jpg' />
                <h3 className={event.name.length > 15 ? "long-name" : "name"}>{limitedName}</h3>

                <span>{getDate(event.start_date)} - {getDate(event.end_date)}</span>
                <p>{event.location_name}</p>
                {event.capacity !== 99999999 ? (
                    <p>Occupacy: {event.joined_count}/{event.capacity}</p>
                ) : (
                    <p>Unlimited capacity</p>
                )}
                <p>{limitedDesc}</p>
            </div>

        </div>
    );
}

export default Event;
