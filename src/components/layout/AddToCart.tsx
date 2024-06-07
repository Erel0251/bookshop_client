// src/components/AddToCart.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Button } from '@mui/material';
import { Book } from '../../types/Book';
import { User } from '../../types/User';
import { addToCart } from '../../redux/slices/CartReducer';
import axios from 'axios';

interface AddToCartProps {
  book: Book;
}

const AddToCart: React.FC<AddToCartProps> = ({ book }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user as User);
  const cart = useAppSelector((state: any) => state.cart);

  const handleAddToCart = async (e: any) => {
    e.stopPropagation();
    if (user) {
      dispatch(
        addToCart({
          book,
          quantity: 1,
        }),
      );
      try {
        const response = await axios.post(`http://localhost:3000/user/cart`, {
          user_id: user.id,
          book_id: book.id,
          quantity: 1,
          update_type: 'Append',
        });
        //dispatch(addToCart(response.data));
      } catch (error) {
        console.error('Failed to add item to cart', error);
      }
    } else {
      // For anonymous users, add to cart in the local state
      dispatch(
        addToCart({
          book,
          quantity: 1,
        }),
      );
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
