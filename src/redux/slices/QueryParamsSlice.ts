// queryParamsSlice.js
import { createSlice } from '@reduxjs/toolkit';

interface QueryParamsState {
  search?: string;
  categories?: string[];
  publishers?: string[];
  rating?: number | null;
  fromPrice: number;
  toPrice?: number;
  type?: string | null;
  offset?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  [key: string]: any; // Add index signature
}

interface PayloadAction {
  payload: {
    name: string;
    value: string | number;
  };
}

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
    setQueryParam: (state: QueryParamsState, action: PayloadAction) => {
      if (action.payload.name === 'categories') {
        const categories = state[action.payload.name] || [];
        if (categories.includes(action.payload.value as string)) {
          // Filter out the category if it already exists
          state[action.payload.name] = categories.filter(
            (category) => category !== action.payload.value,
          );
        } else {
          // Add the category if it doesn't exist
          state[action.payload.name] = [
            ...categories,
            action.payload.value as string,
          ];
        }
      } else if (action.payload.name === 'publishers') {
        const publishers = state[action.payload.name] || [];
        if (publishers.includes(action.payload.value as string)) {
          // Filter out the publisher if it already exists
          state[action.payload.name] = publishers.filter(
            (publisher) => publisher !== action.payload.value,
          );
        } else {
          // Add the publisher if it doesn't exist
          state[action.payload.name] = [
            ...publishers,
            action.payload.value as string,
          ];
        }
      } else {
        state[action.payload.name] = action.payload.value;
      }
    },
    setQueryParams: (state: QueryParamsState, action) => {
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
