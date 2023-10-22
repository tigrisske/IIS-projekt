
import React from "react"
import axiosClient from '../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Dashboard(){

const navigate = useNavigate();

function logout(){
    axiosClient.post('/logout', { withCredentials: true })
    .then(  (response) => {console.log(response);
    navigate('/login');})
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

    return (
        <div>
            <h1>DASHBOARD</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={check}>Verify Login</button>
        </div>
    )
}