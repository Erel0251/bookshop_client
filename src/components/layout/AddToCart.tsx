// src/components/AddToCart.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Button } from '@mui/material';
import { Book } from '../../types/Book';
import { User } from '../../types/User';
import axios from 'axios';
import { addToCart } from '../../redux/cartActions';

interface AddToCartProps {
  book: Book;
}

const AddToCart: React.FC<AddToCartProps> = ({ book }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user as User);

  const handleAddToCart = async () => {
    if (user.isLoggedIn) {
      try {
        const response = await axios.post('/cart', { bookId: book.id });
        dispatch(addToCart(response.data));
      } catch (error) {
        console.error('Failed to add item to cart', error);
      }
    } else {
      // For anonymous users, add to cart in the local state
      dispatch(addToCart(book));
    }
  };

  return (
    <Button
      variant="contained"
      size="medium"
      color="primary"
      fullWidth
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCart;
