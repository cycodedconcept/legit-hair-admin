// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import formLoginReducer from '../features/loginSlice';
import allProductsReducer from '../features/allProductSlice'

const store = configureStore({
  reducer: {
    login: formLoginReducer,
    allProducts: allProductsReducer
  },
});

export default store;
