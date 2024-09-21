import { configureStore } from '@reduxjs/toolkit';
import formLoginReducer from '../features/loginSlice';
import allProductsReducer from '../features/allProductSlice';
import categoryReducer from '../features/categorySlice';
import productReducer from '../features/createProductSlice';
import orderReducer from '../features/orderSlice';


const store = configureStore({
  reducer: {
    login: formLoginReducer,
    allProducts: allProductsReducer,
    categories: categoryReducer,
    product: productReducer,
    order: orderReducer
  },
});

export default store;
