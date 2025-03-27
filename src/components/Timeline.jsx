import React from 'react';

const Timeline = ({ pins, onSelectPin }) => {
  const sortedPins = [...pins].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h2>Your Rides</h2>
      <ul>
        {sortedPins.map((pin, index) => (
          <li key={index} onClick={() => onSelectPin(pin)}>
            {pin.date} - {pin.trailName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
