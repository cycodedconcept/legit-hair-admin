import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categories: [],
  subCategories: [],
  companyCategory: [],
  success: {},
  categoryStatus: [],
  searchValue: {},
  isLoading: false,
  error: null,
  currentPage: 1,
  per_page: 10,
  pre_page: null,
  next_page: null,
  total: 0,
  total_pages: 0
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
      return rejectWithValue(error.response?.data || 'Failed to fetch subcategories');
    }
  }
);

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
      return rejectWithValue(error.response?.data || 'Failed to fetch company categories');
    }
  }
);

export const suspendProduct = createAsyncThunk(
  'categories/suspendProduct',
  async ({token, id}, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://testbackendproject.pluralcode.academy/admin/suspend_product_categories?cat_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to suspend product');
    }
  }
);

export const fetchCategoryStatus = createAsyncThunk(
  'categories/categoryStatus',
  async ({token, catId, statusId}, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://testbackendproject.pluralcode.academy/admin/get_categories?cat_id=${catId}&status=${statusId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch categories and status');
    }
  }
);

export const fetchSearchValue = createAsyncThunk(
  'categories/searchValue',
  async ({token, catId, searchValue}, {rejectWithValue}) => {
    try {
    const response = await axios.get(`https://testbackendproject.pluralcode.academy/admin/get_categories?cat_id=${catId}&search_value=${searchValue}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch categories and search value');
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
      .addCase(fetchCompanyCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompanyCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companyCategory = action.payload;
      })
      .addCase(fetchCompanyCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategoryStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload;

        state.categoryStatus = data.data || [];
        state.currentPage = data.page || 1;
        state.per_page = data.per_page || 10;
        state.pre_page = data.pre_page || null;
        state.next_page = data.next_page || null;
        state.total = data.total || 0;
        state.total_pages = data.total_pages || 0;

      })
      .addCase(fetchCategoryStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSearchValue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchValue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchValue = action.payload;
      })
      .addCase(fetchSearchValue.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export default categorySlice.reducer;
