// src/components/AddPinForm.jsx
import React, { useState } from 'react';
import './AddPinForm.css';

const AddPinForm = ({ onAddPin }) => {
  const [trailName, setTrailName] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (e) => {
    // Convert FileList to an array and limit to 3 files.
    const files = Array.from(e.target.files).slice(0, 3);
    setPhotos(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPin({ trailName, date, note, photos });
    // Clear the form inputs and state.
    setTrailName('');
    setDate('');
    setNote('');
    setPhotos([]);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="add-pin-form">
      <label>
        Trail Name:
        <input 
          type="text" 
          value={trailName} 
          onChange={(e) => setTrailName(e.target.value)} 
          required 
        />
      </label>
      <label>
        Date:
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
      </label>
      <label>
        Note:
        <textarea 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          required 
        />
      </label>
      <label>
        Photos (up to 3):
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          onChange={handlePhotoUpload} 
        />
      </label>
      <button type="submit">Add Pin</button>
    </form>
  );
};

export default AddPinForm;
