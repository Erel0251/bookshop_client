import { configureStore } from '@reduxjs/toolkit';
import queryParamsSlice from './slices/QueryParamsSlice';
import cartReducer from './slices/CartReducer';
import userReducer from './slices/UserSlice';
//import addToCard from '../redux/AddToCard';

const store = configureStore({
  reducer: {
    queryParams: queryParamsSlice,
    cart: cartReducer,
    user: userReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
