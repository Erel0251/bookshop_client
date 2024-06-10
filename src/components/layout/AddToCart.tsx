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
  const user = useAppSelector((state: any) => state.user.user as User);
  //const cart = useAppSelector((state: any) => state.cart);

  const handleAddToCart = async (e: any) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        book,
        quantity: 1,
      }),
    );
    if (user) {
      console.log('user', user.id, 'book', book.id);
      try {
        await axios.post(
          `http://localhost:3000/user/cart`,
          {
            user_id: user.id,
            book_id: book.id,
            quantity: 1,
            update_type: 'Append',
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              role: user?.roles,
            },
            withCredentials: true,
          },
        );
      } catch (error) {
        alert('Failed to add item to cart');
      }
    }
  };

  return (
    <Button
      variant="contained"
      size="medium"
      color="primary"
      fullWidth
      onClick={handleAddToCart}
      disabled={
        (book.status && book.status !== 'AVAILABLE') || book.inventory === 0
      }
    >
      Add to Cart
    </Button>
  );
};

export default AddToCart;
