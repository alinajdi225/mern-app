import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../features/customers/customersSlice';

export const store = configureStore({
  reducer: {
    customers: customerReducer,
  },
});

//Branch Updated.