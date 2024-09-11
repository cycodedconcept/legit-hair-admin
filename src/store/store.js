import { configureStore } from '@reduxjs/toolkit';
import formLoginReducer from '../features/loginSlice';
import allProductsReducer from '../features/allProductSlice';
import categoryReducer from '../features/categorySlice'

const store = configureStore({
  reducer: {
    login: formLoginReducer,
    allProducts: allProductsReducer,
    categories: categoryReducer
  },
});

export default store;
