// src/components/SocialShare.jsx
import React from 'react';
import './SocialShare.css';

const SocialShare = ({ pin }) => {
  if (!pin) return null;

  const shareContent = {
    title: "My TrailPin Ride",
    text: `Check out my ride on ${pin.trailName} on TrailPin!`,
    url: window.location.href
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent.text)}&url=${encodeURIComponent(shareContent.url)}`,
      '_blank'
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareContent.url)}&quote=${encodeURIComponent(shareContent.text)}`,
      '_blank'
    );
  };

  const shareToInstagram = () => {
    // Use Web Share API for Instagram (if available)
    if (navigator.share) {
      navigator.share(shareContent).catch((err) => {
        console.error("Instagram share failed:", err);
      });
    } else {
      // Fallback: Open Instagram homepage
      window.open("https://www.instagram.com/", "_blank");
    }
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(shareContent.title)}&body=${encodeURIComponent(shareContent.text + " " + shareContent.url)}`;
  };

  return (
    <div className="social-share">
      <button className="share-btn" onClick={shareToTwitter}>Share on Twitter</button>
      <button className="share-btn" onClick={shareToFacebook}>Share on Facebook</button>
      <button className="share-btn" onClick={shareToInstagram}>Share on Instagram</button>
      <button className="share-btn" onClick={shareViaEmail}>Share via Email</button>
    </div>
  );
};

export default SocialShare;
