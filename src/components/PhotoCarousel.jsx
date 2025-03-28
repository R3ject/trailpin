// src/components/PhotoCarousel.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './PhotoCarousel.css';

const PhotoCarousel = ({ photos, onClose }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-overlay">
      <button className="close-carousel" onClick={onClose}>Close</button>
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PhotoCarousel;
