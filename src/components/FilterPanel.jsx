// src/components/FilterPanel.jsx
import React, { useState } from 'react';
import './FilterPanel.css';

const usStates = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

const FilterPanel = ({ onFilterChange }) => {
  const [trailName, setTrailName] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilterChange({ trailName, state: stateFilter, startDate, endDate });
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
        <label>State:</label>
        <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
          <option value="">All States</option>
          {usStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
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
