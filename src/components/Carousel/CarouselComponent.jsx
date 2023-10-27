import React from 'react';
import { Carousel, CarouselCaption } from 'react-bootstrap';
import './CarouselComponent.css';

function CarouselComponent({slides}) {
  return (
    <div className="carousel-container">
        <Carousel> 
            {slides.map((slide) =>(
                <Carousel.Item key={slide.uuid}>
                    <img
                    className="d-block w-100"
                    src="https://picsum.photos/200/300"
                    alt="Primera diapositiva"
                    />
                    <CarouselCaption>
                        <h3>{slide.title}</h3>
                        <p>{slide.description}</p>
                    </CarouselCaption>
                </Carousel.Item>
            ))}
        </Carousel>
    </div>
  );
};

export default CarouselComponent;
