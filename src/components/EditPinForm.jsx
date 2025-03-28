// src/components/EditPinForm.jsx
import React, { useState, useEffect } from 'react';
import './EditPinForm.css';

const EditPinForm = ({ pin, onSave, onCancel }) => {
  const [trailName, setTrailName] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (pin) {
      setTrailName(pin.trailName);
      setDate(pin.date);
      setNote(pin.note);
      setPhotos([]);
    }
  }, [pin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ trailName, date, note, photos });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-pin-form">
      <label>
        Trail Name:
        <input type="text" value={trailName} onChange={(e) => setTrailName(e.target.value)} required />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Note:
        <textarea value={note} onChange={(e) => setNote(e.target.value)} required />
      </label>
      <label>
        Photos (upload to replace current photos):
        <input type="file" accept="image/*" multiple onChange={(e) => setPhotos(Array.from(e.target.files))} />
      </label>
      <div className="edit-form-buttons">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditPinForm;
