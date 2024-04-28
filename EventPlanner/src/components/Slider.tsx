import Carousel from 'react-bootstrap/Carousel';
import "./Slider.css"
import { useState } from 'react';

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
        <img className='sliderimg' src="https://www.rave-travel.com/images/event/EventImage%20(1).png" alt="" />
      </Carousel.Item>
      
    </Carousel>
  );
}

export default ControlledCarousel;