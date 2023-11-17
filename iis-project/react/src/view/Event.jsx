import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';

export const Event = () => {
    const [event, setEvent] = useState(null);
    const [location, setLocation] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isJoined, setIsJoined] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Current page for reviews

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

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosClient.get(`/event/${eventId}/reviews?page=${currentPage}`);
                setReviews(response.data.reviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [eventId, currentPage]);

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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className='centered-600px-container ' style={{ textAlign: 'center'}}>
            {event ? (
                <div>
                    <h1>{event.name}</h1>
                    <p>Starting: {event.start_date}</p>
                    <p>End: {event.end_date}</p>
                    <p>Description: {event.description}</p>
                    <p>Capacity:{event.joined_count}/{event.capacity}</p>
                    <p>{location.name}</p>
                    <div>
                        <h3>Event Reviews</h3>
                        {reviews.length > 0 ? (
                            <div>
                                <ul>
                                    {reviews.map((review) => (
                                        <li key={review.id}>
                                            <strong>User:</strong> {review.user_name} <br />
                                            <strong>Rating:</strong> {review.rating} <br />
                                            <strong>Comment:</strong> {review.comment}
                                        </li>
                                    ))}
                                </ul>
                                {/* Pagination buttons */}
                                <div>
                                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                        Previous
                                    </button>
                                    <span>Page {currentPage}</span>
                                    <button onClick={() => handlePageChange(currentPage + 1)}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p>No reviews available for this event.</p>
                        )}
                    </div>
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
