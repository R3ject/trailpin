// src/components/PinModal.jsx
import React, { useState } from 'react';
import PhotoCarousel from './PhotoCarousel';
import EditPinForm from './EditPinForm';
import SocialShare from './SocialShare';
import './PinModal.css';

const PinModal = ({ pin, onClose, onDelete, onEdit }) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [editMode, setEditMode] = useState(false);

  if (!pin) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        {editMode ? (
          <EditPinForm
            pin={pin}
            onSave={(updatedData) => {
              onEdit({ ...pin, ...updatedData });
              setEditMode(false);
            }}
            onCancel={() => setEditMode(false)}
          />
        ) : (
          <>
            <h2>{pin.trailName}</h2>
            <p><strong>Date:</strong> {pin.date}</p>
            <p><strong>Note:</strong> {pin.note}</p>
            {pin.photos && pin.photos.length > 0 && (
              <div className="modal-photos">
                <h3>Photos:</h3>
                <div className="thumbnail-gallery">
                  {pin.photos.map((photo, index) => (
                    <img
                      key={index}
                      className="thumbnail"
                      src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)}
                      alt={`Trail pin ${index + 1}`}
                      onClick={() => setShowCarousel(true)}
                    />
                  ))}
                </div>
              </div>
            )}
            <p><strong>Coordinates:</strong> {pin.coords.lat}, {pin.coords.lng}</p>
            <div className="modal-buttons">
              <button className="modal-btn edit-btn" onClick={() => setEditMode(true)}>Edit</button>
              <button className="modal-btn delete-btn" onClick={() => onDelete(pin)}>Delete</button>
            </div>
            <SocialShare pin={pin} />
          </>
        )}
      </div>
      {showCarousel && (
        <PhotoCarousel photos={pin.photos} onClose={() => setShowCarousel(false)} />
      )}
    </div>
  );
};

export default PinModal;
