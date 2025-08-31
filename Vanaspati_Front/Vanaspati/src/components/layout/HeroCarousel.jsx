// src/components/HeroCarousel.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';
import  "./HeroCarousel.css"; 

const HeroCarousel = () => {
  const images = [
    
    "https://nurserykart.in/cdn/shop/files/slider-2.jpg?v=1740337439&width=3840"
  ];

  return (
    <div className="mt-2">
      <Carousel 
        interval={3000}
      >
        {images.map((src, index) => (
          <div key={index}>
            <img 
              src={src} 
              alt={`Banner ${index + 1}`} 
              className="w-full object-cover h-[400px]"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
