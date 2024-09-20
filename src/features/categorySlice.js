import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categories: [],
  subCategories: [],
  companyCategory: [],
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://testbackendproject.pluralcode.academy/admin/admin_get_all_categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch categories');
    }
  }
);

export const fetchSubcategories = createAsyncThunk(
  'categories/fetchSubcategories',
  async ({token, id}, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://testbackendproject.pluralcode.academy/admin/get_sub_category?cat_id=${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch categories');
    }
  }
)

export const fetchCompanyCategory = createAsyncThunk(
  'categories/fetchCompanyCategory',
  async ({token, id}, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://testbackendproject.pluralcode.academy/admin/get_categories?cat_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch categories');
    }
  }
)

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSubcategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export default categorySlice.reducer;
