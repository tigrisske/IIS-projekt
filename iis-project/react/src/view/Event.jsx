import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../components/Context';
import { set } from 'date-fns';

export const Event = () => {
    const [event, setEvent] = useState(null);
    const [location, setLocation] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isJoined, setIsJoined] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Current page for reviews
    const [tickets, setTickets] = useState([]); // Tickets for the event
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isMyEvent, setIsMyEvent] = useState(undefined); 
    const { user } = useStateContext();


    const { eventId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (eventId) {
                    const response = await axiosClient.get(`/event/${eventId}`);
                    setEvent(response.data.event);
                    setIsJoined(response.data.has_joined);
                    setLocation(response.data.location);
                    setTickets(response.data.tickets);
                    console.log(response.data);
                    console.log('user id:', user.id);
                    console.log('event user id:', event.created_by);
                    console.log(event.created_by === user.id);
                    setIsMyEvent(event.created_by === user.id);
                    console.log('is this my event?:', isMyEvent);
                }
            } catch (error) {
                console.log(`Error fetching event! ${error}`);
            }
        };

        fetchData();
    }, [eventId, isJoined,user]);


    const [eventUsers, setEventUsers] = useState([]); // State to store the users who have sent a login request

    useEffect(() => {
        const fetchEventUsers = async () => {
            try {
                if (eventId && event && event.pay_in_advance) {
                    const response = await axiosClient.get(`/event/${eventId}/users`);
                    setEventUsers(response.data.users);
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error fetching event users:', error);
            }
        };

        fetchEventUsers();
    }, [eventId, event]);

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
            // Check if a ticket is selected
            if (selectedTicket) {
                const response = await axiosClient.post(`/event/${id}/join/ticket/${selectedTicket.id}`);
                setIsError(false);
                setIsJoined(true);
            } else {
                // Show an error if no ticket is selected
                setIsError(true);
                setErrorMessage('Please select a ticket before joining the event.');
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage(`Error joining event! ${error.response.data.message}`);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleTicketChange = (ticket) => {
        setSelectedTicket(ticket);
    };
    const handleApprove = async (userId) => {
        console.log('Request payload:', { userId, eventId });
        try {
            //confirming user
            const approveResponse = await axiosClient.post(`/event/${eventId}/approve/user/${userId}`);
            setIsError(false);
            setErrorMessage(`User approved!`);
            // //decrenmenting number of tickets
            // const ticketsResponse = await axiosClient.post(`/event/${eventId}/decrement-ticket/${selectedTicket.id}`);
            // if (ticketsResponse.data.success) {
            //     console.log(`Number of available tickets decremented for ticket ${selectedTicket.id}.`);
            //     setIsError(false);
            // } else {
            //     setIsError(true);
            //     console.error('Decrementing tickets failed:', ticketsResponse.data.message);
            // }
        } catch (error) {
            setIsError(true);
            setErrorMessage(`Error approving user! ${error.response.data.message}`);
        }
    };

    const handleDecline = (userId) => {
        console.log(`Declining user ${userId}`);
    };

    const handleApproveAll = () => {            // Check if the request to decrement tickets was successful
        console.log('Approving all users');
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
                    {event.pay_in_advance ? (<p> Requires payment in advance.</p>) : null}
                    <p>{location.name}</p>
                    <div>
                        {/* Ticket selection dropdown */}
                        <label htmlFor="ticket">Select a ticket:</label>
                        <select id="ticket" onChange={(e) => handleTicketChange(JSON.parse(e.target.value))}>
                            <option value="">Choose a ticket</option>
                            {tickets.map((ticket) => (
                                <option key={ticket.id} value={JSON.stringify(ticket)}>
                                    {ticket.title} - ${ticket.price}
                                </option>
                            ))}
                        </select>
                    </div>
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
            {event ? ( <div>

      {(user.id === event.created_by) && eventUsers.length > 0 && (
                <div>
                    <h3>Users who have sent a login request:</h3>
                    <button onClick={handleApproveAll}>Approve All</button>
                    <ul>
                        {eventUsers.map((user) => (
                            <li key={user.id}>
                                <p>{user.first_name} {user.last_name}</p>
                                <button onClick={() => handleApprove(user.id)}>Approve</button>
                                <button onClick={() => handleDecline(user.id)}>Decline</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            </div>)
            : (null)}
            
        </div>
    );
};

export default Event;
