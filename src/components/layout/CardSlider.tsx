import { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Book } from '../../types/Book';
import BookCard from './BookCard';

const CardSlider = ({ cards }: { cards: Book[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (cards.length - 3));
  };

  const handlePrev = () => {
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
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.5s ease',
          transform: `translateX(-${currentIndex * 12.5}%)`,
          width: '600%', // Assuming 4 cards visible at once
        }}
      >
        {cards.map((book, index) => (
          <Box
            key={index}
            sx={{
              width: '25%', // 4 cards visible at a time
              boxSizing: 'border-box',
              padding: '4px', // Optional: Adjust padding between cards
            }}
          >
            <BookCard book={book} />
          </Box>
        ))}
      </Box>
      <Button
        onClick={handleNext}
        sx={{ position: 'absolute', right: 0, zIndex: 1 }}
      >
        <ArrowForward />
      </Button>
    </Box>
  );
};

export default CardSlider;
