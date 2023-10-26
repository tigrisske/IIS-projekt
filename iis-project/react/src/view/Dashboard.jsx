
import React from "react"
import axiosClient from '../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';



export default function Dashboard(){

const navigate = useNavigate();

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

function check(){
    axiosClient.post('/auth', { withCredentials: true })
    .then(  (response) => {console.log(response); })
    .catch(error => {console.log(error);
    console.log("error"); return (<Navigate to="/login" />);
    });

}
function user(){
    navigate('/user');
}

function events(){
    navigate('/events');
}

function create_event(){
    navigate('/createevent');
}
function create_location(){
    navigate('/createlocation');
}
function create_category(){
    navigate('/createcategory');
}

    return (
        <div>
            <h1>DASHBOARD</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={user}>My profile</button>
            <button onClick={create_event}>Create Event</button>
            <button onClick={create_location}>Create Location</button>
            <button onClick={create_category}>Create Category</button>
            <button onClick={events}>Events</button>
            <button onClick={check}>Verify Login</button>
        </div>
    )
}