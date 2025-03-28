// src/components/PinModal.jsx
import React from 'react';
import './PinModal.css';

const PinModal = ({ pin, onClose, onDelete, onEdit }) => {
  if (!pin) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{pin.trailName}</h2>
        <p><strong>Date:</strong> {pin.date}</p>
        <p><strong>Note:</strong> {pin.note}</p>
        {pin.photos && pin.photos.length > 0 && (
          <div className="modal-photos">
            <h3>Photos:</h3>
            {pin.photos.map((photo, index) => (
              <img
                key={index}
                src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)}
                alt={`Trail pin ${index + 1}`}
              />
            ))}
          </div>
        )}
        <p>
          <strong>Coordinates:</strong> {pin.coords.lat}, {pin.coords.lng}
        </p>
        <div className="modal-buttons">
          <button className="modal-btn edit-btn" onClick={() => onEdit(pin)}>Edit</button>
          <button className="modal-btn delete-btn" onClick={() => onDelete(pin)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default PinModal;
