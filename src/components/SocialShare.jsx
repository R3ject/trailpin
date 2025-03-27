// src/components/SocialShare.jsx
import React from 'react';

const SocialShare = ({ pin }) => {
  const shareUrl = window.location.href; // Or a specific URL for the pin
  const shareText = `Check out my ride on ${pin.trailName} on TrailPin!`;

  return (
    <div>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Share on Twitter
      </a>
      <br />
      <a
        href={`mailto:?subject=My TrailPin Ride&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
      >
        Share via Email
      </a>
    </div>
  );
};

export default SocialShare;
