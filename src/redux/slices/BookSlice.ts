import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Book } from '../../types/Book';

interface BookState {
  book: Book | null;
}

const initialState: BookState = {
  book: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBook: (state, action: PayloadAction<Book>) => {
      state.book = action.payload;
    },
    clearBook: () => {
      return initialState;
    },
  },
});

export const { setBook, clearBook } = bookSlice.actions;
export default bookSlice.reducer;
