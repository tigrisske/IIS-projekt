import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

const User = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axiosClient.get('/user', { withCredentials: true })
      .then(response => {
        console.log("Data received:", response.data);
        setUserData(response.data);
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }, [])

  return (
    <div>
      {userData ? (
        <div>
          <div>
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

export default User;
