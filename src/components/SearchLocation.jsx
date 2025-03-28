// src/components/SearchLocation.jsx
import React, { useState } from 'react';
import './SearchLocation.css';

const SearchLocation = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        onSearch({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Error searching location");
    }
  };

  return (
    <div className="search-location">
      <input 
        type="text" 
        placeholder="Search for an address or city" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchLocation;
