
import React, { useState,useRef } from 'react';
import axiosClient from '../axios-client';

export const CreateCategory = () => {
    const nameRef = useRef();
    const createdByRef = useRef();
    const parentIdRef = useRef();

    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            const request = {
                name: nameRef.current.value,
                parent_id: parentIdRef.current.value,
                created_by: createdByRef.current.value,
            };
            const response = axiosClient.post('/createcategory', request);
            localStorage.setItem('is_logged', true);
            console.log('toto je response ty coco');
            console.log(response);

            // Reset the input fields
            nameRef.current.value = '';
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
            />
            <input
                type="text"
                ref={parentIdRef}
                placeholder="parent id"
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

export default CreateCategory;
