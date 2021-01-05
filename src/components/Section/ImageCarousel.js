import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = () => {
  return (
    <Carousel>
      <div className="w-auto h-64">
        <img src="logo192.png" />
      </div>
      <div className="w-auto h-1/3">
        <img src="LOGO.png" />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
