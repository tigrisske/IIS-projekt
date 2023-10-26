import React, { useState, useEffect } from 'react';
import './Header.css';

const GuestHeader = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   axiosClient.post('/auth') 
  //     .then(response => {
  //       console.log("user is logged in");
  //       setIsLoggedIn(true);
  //     })
  //     .catch(error => {
  //       setIsLoggedIn(false);
  //     });
  // }, []); 

  return (
    <div className="guest-header">
      <p className="header-text"><a  href="/login">Login</a></p>
      <p className="header-text"><a  href="/signup">Register</a></p>
   </div>
  );
};


export default GuestHeader;
