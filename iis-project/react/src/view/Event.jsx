import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../components/Context';
import { set } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Reviews from '../components/Reviews';

export const Event = () => {
    const [event, setEvent] = useState(null);
    const [location, setLocation] = useState(null);
    const [isJoined, setIsJoined] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Current page for reviews
    const [tickets, setTickets] = useState([]); // Tickets for the event
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isMyEvent, setIsMyEvent] = useState(undefined);
    const { user } = useStateContext();
    const [key, setKey] = useState(0);
    const navigate = useNavigate();


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
    }, [eventId, isJoined, user, key]);


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
    }, [eventId, event, key]);

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

    const navigateToMyEvents = () => {
        navigate('/myevents');
    };

    const handleTicketChange = (ticket) => {
        setSelectedTicket(ticket);
    };
    const handleApprove = async (userId) => {
        setKey(key + 1);
        console.log('Request payload:', { userId, eventId });
        try {
            //confirming user
            const approveResponse = await axiosClient.post(`/event/${eventId}/approve/user/${userId}`);
            setIsError(false);
            setErrorMessage(`User approved!`);

        } catch (error) {
            setIsError(true);
            setErrorMessage(`Error approving user! ${error.response.data.message}`);
        }
    };

    const handleDecline = async (userId) => {
        setKey(key + 1);
        try {
            //confirming user
            const declineResponse = await axiosClient.post(`/event/${eventId}/decline/user/${userId}`);
            setIsError(false);
            setErrorMessage(`User declined!`);

        } catch (error) {
            setIsError(true);
            setErrorMessage(`Error declining user! ${error.response.data.message}`);
        }
    };

    const handleApproveAll = () => {            // Check if the request to decrement tickets was successful
        setKey(key + 1);
        axiosClient.post(`/event/${eventId}/approve/users`)
            .then((response) => {
                console.log(response);
                setIsError(false);
                setErrorMessage(`All users approved!`);
            })
            .catch((error) => {
                console.log("marek toto je error");
                console.log(error);
            })
    };
    const handleDelete = () => {
        axiosClient.post(`/event/${eventId}/delete`)
            .then((response) => {
                console.log(response);
                setIsError(false);
                setErrorMessage(`Event deleted!`);
                navigate('/myevents');

            })
            .catch((error) => {
                console.log("marek toto je error");
                console.log(error);
            })

    }
    return (
        <div className='centered-600px-container ' style={{ textAlign: 'center' }}>
            {event ? (
                <div>

                    <h1>{event.name}</h1>
                    <p>{event.description}</p>
                    <p>Starting: {event.start_date}</p>
                    <p>End: {event.end_date}</p>
                    {event.capacity !== 99999999 ? (
                        <p>{event.joined_count}/{event.capacity} people have joined this event.</p>
                    ) : (
                        <p>Unlimited capacity</p>
                    )}
                    {event.pay_in_advance ? (<p> Requires payment in advance.</p>) : null}
                    <p>{location.name}</p>
                    {isJoined ? (
                        <h3 style={{ color: 'green' }}>You have joined this event.</h3>
                    ) : (
                        new Date(event.start_date) > new Date() ? (
                            <div>
                                {/* Ticket selection dropdown */}
                                <label htmlFor="ticket">Select a ticket:</label>
                                <select id="ticket" onChange={(e) => handleTicketChange(JSON.parse(e.target.value))}>
                                    <option value="">Choose a ticket</option>
                                    {tickets.map((ticket) => (
                                        <option key={ticket.id} value={JSON.stringify(ticket)}>
                                            {ticket.amount > 0 ? (
                                                `${ticket.title} - $${ticket.price} - ${ticket.amount} tickets left`
                                            ) : (
                                                `${ticket.title} - $${ticket.price} - SOLD OUT`
                                            )}
                                        </option>
                                    ))}
                                </select>
                                {(event.confirmed_by != null) && <button onClick={() => handleJoin(eventId)} className='primary-btn'>Join</button>}
                            </div>
                        ) : (
                            <div></div>
                        )
                    )}
                    {event ? (<div>

                        {(user.id === event.created_by) && <button onClick={() => handleDelete()}>Delete</button>}
                        {(user.id === event.created_by) && eventUsers.length > 0 && (
                            <div>
                                <h3>Users who have sent a login request:</h3>
                                <button onClick={() => handleApproveAll()}>Approve All</button>
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
                    {new Date(event.start_date) < new Date() ? (
                        <Reviews eventId={eventId} />
                    ) : (
                        <div>
                            <h2>Reviews</h2>
                            <p>This event did not happen yet. Reviews will be available after the event starts.</p>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading event data...</p>
            )}

            {errorMessage && (
                <div style={{ color: isError ? 'red' : 'green' }}>{errorMessage}</div>
            )}
        </div>
    );
};

export default Event;
