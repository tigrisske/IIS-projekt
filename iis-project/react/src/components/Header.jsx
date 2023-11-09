import React, { useState, useEffect } from 'react';
import './styles/Header.css';
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
    localStorage.removeItem('USER');
    navigate('/login'); 
})
    .catch(error => {console.log(error);
    console.log("error"); return (<Navigate to="/login" />);
    });
}   

  return (
    <div className="guest-header">
      <p className="header-text"><a  href="/dashboard">Dashboard</a></p>
      <p className="header-text"><a  href="/events">Events</a></p>
      <p className="header-text"><a  href="/user">My profile  </a></p>
      <p className="header-text"><a onClick={logout} href="/login">Logout  </a></p>
   </div>
  );
};


export default GuestHeader;
