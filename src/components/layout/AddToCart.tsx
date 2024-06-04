// src/components/AddToCart.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Button } from '@mui/material';
import { Book } from '../../types/Book';
import { User } from '../../types/User';
import { addToCart } from '../../redux/slices/CartReducer';
//import axios from 'axios';

interface AddToCartProps {
  book: Book;
}

const AddToCart: React.FC<AddToCartProps> = ({ book }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user as User);
  const cart = useAppSelector((state: any) => state.cart);

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    if (user) {
      dispatch(addToCart(book));
      /*
      try {
        const response = await axios.post('/cart', { bookId: book.id });
        dispatch(addToCart(response.data));
      } catch (error) {
        console.error('Failed to add item to cart', error);
      }
      */
    } else {
      // For anonymous users, add to cart in the local state
      dispatch(addToCart(book));
    }
    console.log(cart);
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
