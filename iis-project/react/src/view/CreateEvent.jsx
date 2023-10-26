
import React, { useState,useRef } from 'react';
import axiosClient from '../axios-client';

const CreateEvent = () => {
    const nameRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const capacityRef = useRef();
    const descriptionRef = useRef();
    const categoryIdRef = useRef();
    const locationIdRef = useRef();
    const isConfirmedRef = useRef();

    const handleCreate = async (event) => {
        event.preventDefault();
            const request = {
                name: nameRef.current.value,
                start_date: startDateRef.current.value,
                end_date: endDateRef.current.value,
                capacity: capacityRef.current.value,
                description: descriptionRef.current.value,
                category_id: categoryIdRef.current.value,
                location_id: locationIdRef.current.value,
                is_confirmed: isConfirmedRef.current.value,
            };
            axiosClient.post('/createevent', request)
            .then (response => {
                console.log('toto je response ty coco');
                console.log(response);

                // Reset the input fields only if the creation is successful
                nameRef.current.value = '';
                startDateRef.current.value = '';
                endDateRef.current.value = '';
                capacityRef.current.value = '';
                descriptionRef.current.value = '';
                categoryIdRef.current.value = '';
                locationIdRef.current.value = '';
                isConfirmedRef.current.value = '';
            })
            // Handle successful sign in response (store session id in cookies if needed)
            .catch(error => {
            console.log('toto je error ty coco');
            console.log(error); 
            });
        }


    return (
        <div>
            <input
                type="text"
                ref={nameRef}
                placeholder="Name"
                // value={credentials.name}
                // onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
            />
            <input
                type="text"
                ref={startDateRef}
                placeholder="start date"
                // value={credentials.password}
                // onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <input
                type="email"
                ref={endDateRef}
                placeholder="end date"
                // value={credentials.email}
                // onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="email"
                ref={capacityRef}
                placeholder="capacity"
                // value={credentials.email}
                // onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="text"
                ref={descriptionRef}
                placeholder="description"
                // value={credentials.password}
                // onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <input
                type="text"
                ref={isConfirmedRef}
                placeholder="is confirmed"
                // value={credentials.password}
                // onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <input
                type="text"
                ref={locationIdRef}
                placeholder="location id"
                // value={credentials.passwordConfirm}
                // onChange={(e) => setCredentials({ ...credentials, passwordConfirm: e.target.value })}
            />
            <input
                type="text"
                ref={categoryIdRef}
                placeholder="category id"
                // value={credentials.passwordConfirm}
                // onChange={(e) => setCredentials({ ...credentials, passwordConfirm: e.target.value })}
            />
            <button onClick={handleCreate}>Create</button>
        </div>
    );
}

export default CreateEvent;
