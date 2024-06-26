// src/redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types/Book';

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.book.id === action.payload.book.id,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          book: action.payload.book,
          quantity: action.payload.quantity,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.book.id !== action.payload,
      );
    },
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find(
        (item) => item.book.id === action.payload.id,
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  loadCart,
  clearCart,
  updateCartItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
