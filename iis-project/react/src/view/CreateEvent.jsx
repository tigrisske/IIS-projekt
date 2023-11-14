
import React, { useState,useRef } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../components/Context';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-bootstrap-time-picker';
import moment from 'moment';

const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
  
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(date);
    return formattedDate;
  };
  

export const CreateEvent = () => {
    const nameRef = useRef();
    const capacityRef = useRef();
    const descriptionRef = useRef();
    const categoryIdRef = useRef();
    const locationIdRef = useRef();

    const [selectedStartTime, setSelectedStartTime] = useState(0);
    const [selectedEndTime, setSelectedEndTime] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const [isError, setIsError] = useState(false);
  
    const handleStartDateChange = (date) => {
      setStartDate(date);
    };
  
    const handleEndDateChange = (date) => {
      setEndDate(date);
    };
  

    const handleCreate = async (event) => {
        event.preventDefault();

        const sDate = new Date(startDate);
        const eDate = new Date(endDate);
        const formatedStartDate = sDate.getFullYear() + '-' + (sDate.getMonth() + 1) + '-' + sDate.getDate();
        const formatedEndDate = eDate.getFullYear() + '-' + (eDate.getMonth() + 1) + '-' + eDate.getDate();

        console.log(startDate);
        console.log(endDate)

        if (formatedEndDate === formatedStartDate){
          console.log("same date");
          if (selectedEndTime < selectedStartTime){
            setIsError(true);
            setErrorMessage("End time cannot be before start time!");
            return;
          }
        }

        //time 
      
        
        const request = {
          name: nameRef.current.value,
          start_date: `${formatedStartDate} ${formatTime(selectedStartTime)} `,
          end_date: `${formatedEndDate} ${formatTime(selectedEndTime)} `,
          capacity:  capacityRef.current.value,
          description: descriptionRef.current.value,
          category_id: categoryIdRef.current.value,
          location_id: locationIdRef.current.value,
        };
      
        axiosClient.post('/createevent', request)
          .then(response => {
            console.log('Response:', response);
            setIsError(false);
            setErrorMessage('Successfully created!');
      
            // Clear input values
            nameRef.current.value = '';
            capacityRef.current.value = '';
            descriptionRef.current.value = '';
            categoryIdRef.current.value = '';
            locationIdRef.current.value = '';
          })
          .catch(error => {
            console.log('Error:', error);
            setIsError(true);
            setErrorMessage(`Error creating event! ${error.response.data.message}`);
          });
      };
      


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
       <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          maxDate={endDate ? endDate : null}
          dateFormat="yyyy-MM-dd"
        />
 <div>
      <label>Select starting time:</label>
      <TimePicker
        start="00:00"
        end="23:59"
        format={24}
        value={selectedStartTime}
        onChange={(time) => setSelectedStartTime(time)}
        step={15}
      />
    </div> 
  
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
 <div>
      <label>Select ending time:</label>
      <TimePicker
        start="00:00"
        end="23:59"
        format={24}
        value={selectedEndTime}
        onChange={(time) => setSelectedEndTime(time)}
        step={15}
      />
    </div> 
      </div>   
     
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
            {errorMessage && <div style={{ color: isError ? 'red' : 'green' }}>{errorMessage}</div>}
        </div>
    );
}

export default CreateEvent;
