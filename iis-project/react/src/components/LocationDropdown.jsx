import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

export const LocationDropdown = ({ onSelect }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axiosClient.get('/locations'); // Replace with your actual API endpoint
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationChange = (event) => {
    const locationId = event.target.value;
    const selected = locations.find((location) => location.id === parseInt(locationId));
    setSelectedLocation(selected);
    onSelect(selected); // Pass the selected location to the parent component
  };

  return (
    <div>
      <label htmlFor="location">Select Location:</label>
      <select id="location" onChange={handleLocationChange}>
        <option value="">Select a location</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
};


