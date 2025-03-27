// src/components/FilterPanel.jsx
import React, { useState } from 'react';

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
      <label>
        Trail Name:
        <input 
          type="text" 
          value={trailName} 
          onChange={(e) => setTrailName(e.target.value)} 
        />
      </label>
      <label>
        Start Date:
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        />
      </label>
      <label>
        End Date:
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
        />
      </label>
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default FilterPanel;
