import {configureStore} from '@reduxjs/toolkit';
import pageChangeSlice from './slices/pageChangeSlice';

export const store = configureStore({
  reducer: {
    pageChange: pageChangeSlice,
  },
});
