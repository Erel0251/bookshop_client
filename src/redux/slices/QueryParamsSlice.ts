// queryParamsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const defaults = {
  search: '',
  categories: [],
  publishers: [],
  rating: null,
  fromPrice: 0,
  toPrice: 1000000,
  type: null,
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
      if (action.payload.name === 'categories') {
        let categories = state[action.payload.name];
        if (categories.includes(action.payload.value)) {
          // Filter out the category if it already exists
          state[action.payload.name] = categories.filter(
            (category) => category !== action.payload.value,
          );
        } else {
          // Add the category if it doesn't exist
          state[action.payload.name] = [...categories, action.payload.value];
        }
      } else if (action.payload.name === 'publishers') {
        let publishers = state[action.payload.name];
        if (publishers.includes(action.payload.value)) {
          // Filter out the publisher if it already exists
          state[action.payload.name] = publishers.filter(
            (publisher) => publisher !== action.payload.value,
          );
        } else {
          // Add the publisher if it doesn't exist
          state[action.payload.name] = [...publishers, action.payload.value];
        }
      }
    },
    setQueryParams: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    resetQueryParams: () => defaults,
  },
});

export const { setQueryParam, setQueryParams, resetQueryParams } =
  queryParamsSlice.actions;
export default queryParamsSlice.reducer;
