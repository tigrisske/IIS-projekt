
import React, { useState,useRef } from 'react';
import axiosClient from '../axios-client';

export const CreateLocation = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const nameRef = useRef();
    const addressLineRef = useRef();
    const cityRef = useRef();
    const zipCodeRef = useRef();
    const countryRef = useRef();
    const descriptionRef = useRef();
    const createdByRef = useRef();

    const handleCreate = async (event) => {
        event.preventDefault();
            const request = {
                name: nameRef.current.value,
                address_line_1: addressLineRef.current.value,
                city: cityRef.current.value,
                zip_code: zipCodeRef.current.value,
                country: countryRef.current.value,
                description: descriptionRef.current.value,
            };
            axiosClient.post('/createlocation', request)
            .then(response => {
            
            setIsError(false);
            setErrorMessage('Successfully created!');
            localStorage.setItem('is_logged', true);
            console.log('toto je response ty coco');
            console.log(response);

            nameRef.current.value = '';
            addressLineRef.current.value = '';
            cityRef.current.value = '';
            zipCodeRef.current.value = '';
            countryRef.current.value = '';
            descriptionRef.current.value = '';
            })
        .catch (error =>{
            setIsError(true);
            setErrorMessage(`Error creating location! ${error.response.data.message}`);

        })
    };

    return (
        <div>
            <h1>Create new Location!</h1>
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
            <button onClick={handleCreate}>Create</button>
            {errorMessage && <div style={{ color: isError ? 'red' : 'green' }}>{errorMessage}</div>}
        </div>

    );
};

export default CreateLocation;
