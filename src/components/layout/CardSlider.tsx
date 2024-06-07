import { useState, useEffect } from 'react';
import { Button, Box, Grid } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Book } from '../../types/Book';
import BookCard from './BookCard';
import Carousel from 'react-material-ui-carousel';

const CardSlider = ({ cards }: { cards: Book[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  });

  const handleNext = () => {
    if (cards.length <= 4) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (cards.length - 3));
  };

  const handlePrev = () => {
    if (cards.length <= 4) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 4 : prevIndex - 1,
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        osition: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Button
        onClick={handlePrev}
        sx={{ position: 'absolute', left: 0, zIndex: 1 }}
      >
        <ArrowBack />
      </Button>
      <Grid
        sx={{
          display: 'flex',
          transition: 'transform 0.5s ease',
          // transform 12.5% with calculate the padding 4px
          transform: `translateX(-${14.2 * currentIndex}%)`,
          width: '600%', // Assuming 4 cards visible at once
        }}
      >
        {cards.map((book, index) => (
          <Grid item key={index} xs={12} md={6} lg={3} spacing={2}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={handleNext}
        sx={{ position: 'absolute', right: 0, zIndex: 1 }}
      >
        <ArrowForward />
      </Button>
    </Box>
  );
};

export const CardSliderV2 = ({ cards }: { cards: Book[] }) => {
  return (
    <Carousel
      sx={{ width: '100%', overflow: 'hidden' }}
      autoPlay={true}
      animation="slide"
      navButtonsAlwaysVisible={true}
      navButtonsProps={{
        style: {
          backgroundColor: 'white',
          color: 'black',
          opacity: 0.5,
        },
      }}
    >
      {cards.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </Carousel>
  )
}

export default CardSlider;
