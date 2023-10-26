import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

const Events = () => {
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    // Fetch user data when the component mounts
    axiosClient.get('/events', { withCredentials: true })
      .then(response => {
        console.log("Data received:", response.data);
        setUserData(response.data); // Store the user data in the state
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      {userData ? ( // Conditionally render the user data
        <div>
          <div>
          I need more buulets, i need more wepons
            <div>
                {userData.first_name}
                {userData.last_name}
            </div>
            {userData.email}
            {userData.date_of_birth}
          <div>
        </div>
    </div>
    </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <div>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default Events;
