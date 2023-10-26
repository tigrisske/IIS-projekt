
import React, { useState,useRef } from 'react';
import axiosClient from '../axios-client';

const CreateLocation = () => {
    const nameRef = useRef();
    const addressLineRef = useRef();
    const cityRef = useRef();
    const zipCodeRef = useRef();
    const countryRef = useRef();
    const descriptionRef = useRef();
    const createdByRef = useRef();

    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            const request = {
                name: nameRef.current.value,
                address_line_1: addressLineRef.current.value,
                city: cityRef.current.value,
                zip_code: zipCodeRef.current.value,
                country: countryRef.current.value,
                description: descriptionRef.current.value,
                created_by: createdByRef.current.value,
            };
            const response = axiosClient.post('/createlocation', request);
            localStorage.setItem('is_logged', true);
            console.log('toto je response ty coco');
            console.log(response);

            // Reset the input fields
            nameRef.current.value = '';
            addressLineRef.current.value = '';
            cityRef.current.value = '';
            zipCodeRef.current.value = '';
            countryRef.current.value = '';
            descriptionRef.current.value = '';
            createdByRef.current.value = '';

            // Handle successful sign in response (store session id in cookies if needed)
        } catch (error) {
            console.log('toto je error ty coco');
            console.log(error); 

        }
    };

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
                ref={addressLineRef}
                placeholder="address line"
                // value={credentials.password}
                // onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <input
                type="email"
                ref={cityRef}
                placeholder="city"
                // value={credentials.email}
                // onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="email"
                ref={zipCodeRef}
                placeholder="zip code"
                // value={credentials.email}
                // onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="email"
                ref={countryRef}
                placeholder="country"
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
                ref={createdByRef}
                placeholder="created by"
                // value={credentials.password}
                // onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button onClick={handleCreate}>Create</button>
        </div>
    );
};

export default CreateLocation;
