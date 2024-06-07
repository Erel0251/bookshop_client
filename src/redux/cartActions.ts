import { Book } from '../types/Book';
import { CartItem } from './slices/CartReducer';

// src/redux/actions/cartActions.ts
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const LOAD_CART = 'LOAD_CART';

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: CartItem;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: string;
}

interface LoadCartAction {
  type: typeof LOAD_CART;
  payload: Book[];
}

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | LoadCartAction;

export const addToCart = (book: CartItem): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: book,
});

export const removeFromCart = (bookId: string): RemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  payload: bookId,
});

export const loadCart = (cart: Book[]): LoadCartAction => ({
  type: LOAD_CART,
  payload: cart,
});
