import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [], 
    currentPage: 1,
    per_page: 10,
    pre_page: null,
    next_page: null,
    total: 0,
    total_pages: 0,
    isLoading: false,
    error: null,
};

export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async ({ page, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://testbackendproject.pluralcode.academy/admin/admin_get_product?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.data || !response.data.data) {
                throw new Error('Invalid API response structure');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const allProductsSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                const data = action.payload;

                console.log('Fetched products data:', data);

                state.products = data.data || [];
                state.currentPage = data.page || 1;
                state.per_page = data.per_page || 10;
                state.pre_page = data.pre_page || null;
                state.next_page = data.next_page || null;
                state.total = data.total || 0;
                state.total_pages = data.total_pages || 0;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const { setPage } = allProductsSlice.actions;

export const selectAllProducts = (state) => state.allProducts;

export const selectProducts = createSelector(
    [selectAllProducts],
    (allProducts) => allProducts?.products || []
);

export const selectCurrentPage = createSelector(
    [selectAllProducts],
    (allProducts) => allProducts?.currentPage
);

export const selectTotalPages = createSelector(
    [selectAllProducts],
    (allProducts) => allProducts?.total_pages
);

export const selectIsLoading = createSelector(
    [selectAllProducts],
    (allProducts) => allProducts?.isLoading
);

export const selectError = createSelector(
    [selectAllProducts],
    (allProducts) => allProducts?.error
);

export default allProductsSlice.reducer;
