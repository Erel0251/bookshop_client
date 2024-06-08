import { createSlice } from '@reduxjs/toolkit';

interface ReviewQueryParams {
  rating?: number;
  offset?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  [key: string]: any;
}

interface PayloadAction {
  payload: {
    name: string;
    value: string | number;
  };
}

const defaults = {
  rating: undefined,
  offset: 0,
  limit: 10,
  sortBy: 'updated_at',
  order: 'DESC',
};

const reviewQueryParamsSlice = createSlice({
  name: 'reviewQueryParams',
  initialState: defaults,
  reducers: {
    setReviewQueryParam: (state: ReviewQueryParams, action: PayloadAction) => {
      state[action.payload.name] = action.payload.value;
    },
    setReviewQueryParams: (state: ReviewQueryParams, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    clearQueryParams: () => defaults,
  },
});

export const { setReviewQueryParam, setReviewQueryParams, clearQueryParams } =
  reviewQueryParamsSlice.actions;
export default reviewQueryParamsSlice.reducer;
