import React, { useState } from 'react';

const AddPinForm = ({ onAddPin }) => {
  const [trailName, setTrailName] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pinData = { trailName, date, note, photos };
    onAddPin(pinData);
    setTrailName('');
    setDate('');
    setNote('');
    setPhotos([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Trail Name:
        <input type="text" value={trailName} onChange={(e) => setTrailName(e.target.value)} required />
      </label>
      <br />
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <br />
      <label>
        Note:
        <textarea value={note} onChange={(e) => setNote(e.target.value)} required />
      </label>
      <br />
      <label>
        Photos (1-3):
        <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} required />
      </label>
      <br />
      <button type="submit">Add Pin</button>
    </form>
  );
};

export default AddPinForm;
