import { configureStore } from '@reduxjs/toolkit';
import collectionsReducer from './slices/collectionsSlice';

const store = configureStore({
  reducer: {
    collections: collectionsReducer,
  },
});

export default store;