import React, { useState, useEffect } from "react";
import axiosClient from '../axios-client';
import Event from '../components/EventItem.jsx';

export const Events = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [finishedEvents, setFinishedEvents] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                let route = finishedEvents ? `/finishedevents?page=${currentPage}` : `/events?page=${currentPage}`;
                const response = await axiosClient.get(route);
                setEvents(response.data.data); // Use response.data.data for Laravel pagination
                setTotalPages(response.data.last_page);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [currentPage, finishedEvents]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleEventsButton = () => {
        setFinishedEvents(!finishedEvents);
    }

    return (
        <div>
            <h1>Events</h1>
            <button onClick={() => navigate('/createevent')} className="primary-btn">Create an event</button>
            <div>
                <div className="end-aligned-row-flex-container">
                    <form className="radio-form">
                        <label htmlFor="eventOption">Upcoming</label>
                        <input
                            type="radio"
                            name="upcoming"
                            id="upcoming"
                            value="upcoming"
                            checked={!finishedEvents}
                            onChange={handleEventsButton}
                        />
                        <label htmlFor="finished">Finished</label>
                        <input
                            type="radio"
                            name="finished"
                            id="finished"
                            value="finished"
                            checked={finishedEvents}
                            onChange={handleEventsButton}
                        />
                    </form>
                </div>
                {events.length > 0 ? (
                    <div>
                        <div className="events-list-container">
                            {events.map((event) => (
                                <Event key={event.id} {...event} />
                            ))}
                        </div>
                        <div>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button key={index + 1} onClick={() => handlePageClick(index + 1)}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>There are no events.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
