import { configureStore } from '@reduxjs/toolkit';
import queryParamsSlice from '../redux/QueryParamsSlice';
//import addToCard from '../redux/AddToCard';

const store = configureStore({
  reducer: {
    queryParams: queryParamsSlice,
    //addToCard: addToCard,
  },
});

export default store;
