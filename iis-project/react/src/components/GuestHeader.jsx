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
      <li className="guesst-header"><a className="guests-header" href="/login">Login</a></li>
      <li className="guesst-header"><a className="guest-sheader" href="/signup">Register</a></li>
   </div>
  );
};


export default GuestHeader;
