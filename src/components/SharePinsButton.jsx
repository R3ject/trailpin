// src/components/SharePinsButton.jsx
import React from 'react';

const SharePinsButton = ({ pins }) => {
  const handleShare = () => {
    const json = JSON.stringify(pins, null, 2);
    navigator.clipboard.writeText(json)
      .then(() => alert("Pin data copied to clipboard!"))
      .catch((err) => alert("Failed to copy pin data: " + err));
  };

  return (
    <button onClick={handleShare}>Share Pins</button>
  );
};

export default SharePinsButton;
