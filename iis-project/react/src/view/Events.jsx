import React, { useState, useEffect } from "react";
import axiosClient from '../axios-client';
import Event from '../components/EventItem.jsx';

export const Events = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axiosClient.get(`/events?page=${currentPage}`);
                setEvents(response.data.data); // Use response.data.data for Laravel pagination
                setTotalPages(response.data.last_page);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [currentPage]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h1>Events</h1>
            <div className="events-list-container">
                {events.map((event) => (
                    <Event key={event.id} {...event} />
                ))}
            </div>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageClick(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Events;
