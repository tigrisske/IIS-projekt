
import React, { useState,useRef } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../components/Context';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const DateRangePicker = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  
    const handleStartDateChange = (date) => {
      setStartDate(date);
    };
  
    const handleEndDateChange = (date) => {
      setEndDate(date);
    };
  
    return (
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
        />
  
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
        />
      </div>
    );
  };
  

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
                start_date: startDate,
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

                nameRef.current.value = '';
                startDateRef.current.value = '';
                endDateRef.current.value = '';
                capacityRef.current.value = '';
                descriptionRef.current.value = '';
                categoryIdRef.current.value = '';
                locationIdRef.current.value = '';
                isConfirmedRef.current.value = '';
            })

            .catch(error => {
            console.log('toto je error ty coco');
            console.log(error); 
            });
        }


    return (
        <div>
            <h1 className="create-event">Create your event!</h1>
            <input
                type="text"
                ref={nameRef}
                placeholder="Name"
                // value={credentials.name}
                // onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
            />
            <DateRangePicker />
            {/* <input
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
            /> */}
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
