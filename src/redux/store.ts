import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';

import queryParamsSlice from './slices/QueryParamsSlice';
import cartReducer from './slices/CartReducer';
import userReducer from './slices/UserSlice';
import bookReducer from './slices/BookSlice';

const reducers = {
  queryParams: queryParamsSlice,
  cart: cartReducer,
  user: userReducer,
  book: bookReducer,
};

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['user', 'cart'],
};

const rootReducer = (state: any, action: any) => {
  return {
    queryParams: reducers.queryParams(state?.queryParams, action),
    cart: reducers.cart(state?.cart, action),
    user: reducers.user(state?.user, action),
    book: reducers.book(state?.book, action),
  };
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
