import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import Event from '../components/Event.jsx';
import './styles/EventsView.css';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../components/Context';

const Events = () => {
  const { pagee } = useParams();
  const [eventData, setEventData] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const { token } = useStateContext();

  // Update the page state when pagee changes
  useEffect(() => {
    setPage(pagee); // Set the page state to match the pagee parameter
    console.log("Page:", pagee);
    // let route = '/events';
    
    // if (!token){
    //   route = '/guest/events';
    // }

    axiosClient.get('/events/count', { withCredentials: true })
      .then(response => {
        console.log("Count received:", response.data.count);
        setCount(response.data.count);
      })
      .catch(error => {
        console.log("Error fetching count:", error);
      });

    axiosClient.get(`/events/${pagee}`, { withCredentials: true })
      .then(response => {
        console.log("Data received:", response.data);
        setEventData(response.data);
      })
      .catch(error => {
        console.log("Error fetching events:", error);
      });
  }, [pagee]);

  return (
    <div>
      {eventData ? (
        <div className="events">
          {eventData.events.map((event) => (
            <Event key={event.id} {...event} />
          ))}
        </div>
      ) : (
        <p>Loading event data...</p>
      )}
    
         <p>
        {Array.from({ length: Math.ceil(count / 4) }, (_, index) => (
          <a key={index} href={`/events/${index + 1}`}>
            {index + 1}
           </a>
        ))}

      </p>
    </div>
  );
};

export default Events;