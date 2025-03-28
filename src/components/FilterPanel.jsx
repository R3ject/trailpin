// src/components/FilterPanel.jsx
import React, { useState } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ onFilterChange }) => {
  const [trailName, setTrailName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilterChange({ trailName, startDate, endDate });
  };

  return (
    <div className="filter-panel">
      <h2>Filters</h2>
      <div className="filter-item">
        <label>Trail Name:</label>
        <input 
          type="text" 
          value={trailName} 
          onChange={(e) => setTrailName(e.target.value)} 
        />
      </div>
      <div className="filter-item">
        <label>Start Date:</label>
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        />
      </div>
      <div className="filter-item">
        <label>End Date:</label>
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
        />
      </div>
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default FilterPanel;
