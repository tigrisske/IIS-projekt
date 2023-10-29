import React, { useState } from 'react';
import axiosClient from '../axios-client';

const Profile = () =>  {
    const [user, setUser] = useStateContext();
    return (
        <div className="profile">
            <h1 className="profile-name">Welcome {user.first_name} {user.last_name}</h1>
        </div>
    );
}

export default Profile;
