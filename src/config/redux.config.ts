import { configureStore } from '@reduxjs/toolkit';
import queryParamsSlice from '../queries/queryParamsSlice';

const store = configureStore({
  reducer: {
    queryParams: queryParamsSlice,
  },
});

export default store;
