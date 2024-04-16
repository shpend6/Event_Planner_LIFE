import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Slider.css"

function ControlledCarousel() {
  const [index, setIndex] = useState<number>(0); // Specify the type as number

  const handleSelect = (selectedIndex: number) => { // Specify the type of selectedIndex
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img className='sliderimg' src="https://www.rave-travel.com/images/event/sanfest-1903x519-min.jpg" alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img className='sliderimg' src="https://www.rave-travel.com/images/event/1_BK.jpg" alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img className='sliderimg' src="https://www.jonesday.com/-/media/files/publications/2019/05/when-coding-is-criminal/when-coding-is-criminal.jpg?rev=7daa2e80878c4c119b1b3cf1d5864271&hash=2AFE58E34713714383DC16573947705B" alt="" />
        <Carousel.Caption>
          <h3>Hackathon</h3>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
  );
}

export default ControlledCarousel;