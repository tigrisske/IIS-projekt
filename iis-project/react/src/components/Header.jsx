import React, { useState, useEffect } from 'react';
import './Header.css';
import axiosClient from '../axios-client';

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
  function logout(){
    axiosClient.post('/logout', { withCredentials: true })
    .then(  (response) => {console.log(response);
    localStorage.removeItem('ACCESS_TOKEN');
    navigate('/login'); 
})
    .catch(error => {console.log(error);
    console.log("error"); return (<Navigate to="/login" />);
    });
}   

  return (
    <div className="guest-header">
      <li className="guesst-header"><a className="guests-header" href="/dashboard">Dashboard</a></li>
      <li className="guesst-header"><a className="guest-sheader" href="/events">Events</a></li>
      <li className="guesst-header"><a onClick={logout} href="/login">Logout  </a></li>
   </div>
  );
};


export default GuestHeader;
