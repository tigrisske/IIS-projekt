
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

            nameRef.current.value = '';
            addressLineRef.current.value = '';
            cityRef.current.value = '';
            zipCodeRef.current.value = '';
            countryRef.current.value = '';
            descriptionRef.current.value = '';
            createdByRef.current.value = '';

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
            />
            <input
                type="text"
                ref={addressLineRef}
                placeholder="address line"
            />
            <input
                type="email"
                ref={cityRef}
                placeholder="city"
            />
            <input
                type="email"
                ref={zipCodeRef}
                placeholder="zip code"
            />
            <input
                type="email"
                ref={countryRef}
                placeholder="country"
            />
            <input
                type="text"
                ref={descriptionRef}
                placeholder="description"
            />
            <input
                type="text"
                ref={createdByRef}
                placeholder="created by"
            />
            <button onClick={handleCreate}>Create</button>
        </div>
    );
};

export default CreateLocation;
