import React, { useState, useEffect } from "react";
import axiosClient from '../axios-client.js';
import Event from '../components/EventItem.jsx';
import { useNavigate } from 'react-router-dom';

export const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axiosClient.get(`/myevents?page=${currentPage}`);
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
        <div >
            <h1>My Events</h1>
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
                    <p>You have not yet creted any events.</p>
                    <button onClick={() => navigate('/createevent')}>Create an event</button>
                </div>
            )}
        </div>
    );
};

export default MyEvents;
