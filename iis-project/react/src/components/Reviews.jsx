import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { FaStar } from "react-icons/fa";
import { useStateContext } from "../components/Context.jsx";



export const Reviews = ({ eventId }) => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Current page for reviews
    const [lastPage, setLastPage] = useState(1); // Last page for reviews
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(0);
    const [submitted, setSubmitted] = useState(false); // State to track review submission
    const { user, compareRoles, setNotification } = useStateContext();
    const stars = Array(5).fill(0)

    useEffect(() => {
        // Fetch reviews whenever 'submitted' state changes
        const fetchReviews = async () => {
            try {
                const response = await axiosClient.get(`/event/${eventId}/reviews?page=${currentPage}`);
                setReviews(response.data.data);
                setCurrentPage(response.data.current_page);
                setLastPage(response.data.last_page);
                setSubmitted(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [eventId, currentPage, submitted]);


    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(0)
    }

    const handleReviewSubmit = async () => {
        if (user.isAuthenticated === false) {
            setNotification('You must be logged in to submit a review!', 'error');
            return;
        } else {
            try {
                await axiosClient.post(`/event/${eventId}/reviews`, { rating: currentValue, comment: document.querySelector('textarea').value });
                setSubmitted(true); // Set submitted state to true after successful submission
                setHoverValue(0);
                setCurrentValue(0);
                document.querySelector('textarea').value = '';
                setNotification('Review submitted successfully!', 'success');
            } catch (error) {
                setNotification('Review submission failed! ' + error, 'error');
            }
        }

    }

    const handleReviewDelete = (reviewId) => async () => {
        try {
            const response = await axiosClient.delete(`/review/${reviewId}`);
            setReviews(reviews.filter((review) => review.id !== reviewId));
            console.log(response.data.message);
            setNotification(response.data.message, 'success')
        } catch (error) {
            setNotification('Review deletion failed! ' + error, 'error');
        }
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= lastPage) {
            setCurrentPage(newPage);
        }
    };

    const generateStars = (review) => {
        const stars = [];
        for (let i = 1; i <= review.rating; i++) {
            stars.push(<FaStar
                key={i}
                size={20}
                color={'orange'}
                style={{ margin: 2, }}
            />);
        }
        return stars;
    };

    return (
        <div className='centered-600px-container'>
            <h3>How did you like the event?</h3>
            <textarea id='comment' placeholder="Write your review..." />
            <div className='end-aligned-row-flex-container'>
                <div className='stars'>
                    {stars.map((_, index) => {
                        return (
                            <FaStar
                                key={index}
                                size={24}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                color={(hoverValue || currentValue) > index ? 'orange' : '#ccc'}
                                style={{
                                    marginRight: 10,
                                    cursor: "pointer"
                                }}
                            />
                        )
                    })}
                </div>
                <button className='primary-btn' onClick={() => handleReviewSubmit()}>
                    Send Review
                </button>
            </div>
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
                <div className='full-width'>
                    <ul>
                        {reviews.map((review) => (
                            <li key={review.id} className='left-start-aligned-flex-container'>
                                <div className='space-between-row-flex-container full-width'>
                                    <div><strong>{review.user.first_name} {review.user.last_name}</strong> </div>
                                    <div className='align-center'><strong>Rating:</strong>{generateStars(review)}</div>
                                </div>
                                <div>
                                    <p style={{ textAlign: 'left' }}>{review.comment}</p>
                                </div>
                                {compareRoles(user.role, 'moderator') === true ? (
                                    <div className='end-aligned-row-flex-container full-width'>
                                        <button className='delete-btn' onClick={handleReviewDelete(review.id)}>Delete</button>
                                    </div >
                                ) : (
                                    <div></div>
                                )}
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
            )
            }
        </div >
    )
}

export default Reviews;