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
                    src={`data:image/png;base64, ${slide.image}`}
                    alt="Primera diapositiva"
                    />
                    <CarouselCaption style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '20px' }}> 
                        <div className='carouselTitle'>
                            <h3>{slide.title}</h3><h3>${slide.price}</h3>
                        </div>
                        <p>{slide.description}</p>
                    </CarouselCaption>
                </Carousel.Item>
            ))}
        </Carousel>
    </div>
  );
};

export default CarouselComponent;
