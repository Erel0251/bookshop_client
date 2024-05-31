// queryParamsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const defaults = {
  search: '',
  category: '',
  rating: null,
  fromPrice: null,
  toPrice: null,
  offset: 0,
  limit: 20,
  sortBy: 'updated_at',
  order: 'DESC',
};

const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState: defaults,
  reducers: {
    setQueryParam: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    setQueryParams: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    resetQueryParams: () => defaults,
  },
});

export const { setQueryParam, resetQueryParams } = queryParamsSlice.actions;
export default queryParamsSlice.reducer;
