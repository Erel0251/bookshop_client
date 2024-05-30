import { Carousel } from 'react-responsive-carousel';

const CarouselHome = () => {
  return (
    <div>
      <Carousel showThumbs={false} showStatus={false} autoPlay infiniteLoop>
        <div>
          <img src="src/assets/images/carhousel-1.jpg" alt="book" />
        </div>
        <div>
          <img src="src/assets/images/carhousel-2.jpg" alt="book" />
        </div>
        <div>
          <img src="src/assets/images/carhousel-3.jpg" alt="book" />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselHome;
