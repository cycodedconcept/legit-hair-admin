import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [], 
    productDetails: {},
    searchDetails: {},
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
export const getProductDetails = createAsyncThunk(
    'products/getDetails',
    async ({id, token}, { rejectWithValue}) => {
        try {
            const response = await axios.get(`https://testbackendproject.pluralcode.academy/admin/product_details?product_id=${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return response.data;  
        } catch (error) {
          return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
)



export const updateProduct = createAsyncThunk(
    'products/getUpdateProduct',
    async ({formData, token}, {rejectWithValue}) => {
        try {
            const response = await axios.post('https://testbackendproject.pluralcode.academy/admin/update_product', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
          return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
)


export const fetchDetails = createAsyncThunk(
    'products/fetchProduct',
    async ({ token, searchValue, page }, { rejectWithValue }) => {
      try {
        console.log("Starting fetchDetails with searchValue:", searchValue);
        
        const response = await axios.get(
          `https://testbackendproject.pluralcode.academy/admin/admin_get_product?search_value=${searchValue}&page=${page}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log("API response:", response.data);
        return response.data;
  
      } catch (error) {
        console.error("Error fetching product details:", error);
  
        return rejectWithValue(error.response?.data || 'Something went wrong while fetching the product details.');
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
            })
            .addCase(getProductDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action.payload;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedProduct = action.payload;
                
                const index = state.products.findIndex(product => product.id === updatedProduct.id);
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            })            
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(fetchDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            
                const payload = action.payload;
            
                state.searchDetails = payload || {};
                state.currentPage = payload.page || 1;
                state.per_page = payload.per_page || 10;
                state.pre_page = payload.pre_page || null;
                state.next_page = payload.next_page || null;
                state.total = payload.total || 0;
                state.total_pages = payload.total_pages || 0;
            })            
            .addCase(fetchDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Something went wrong';
            })
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
export const selectProductDetails = createSelector(
    [selectAllProducts],
    (allProducts) => allProducts?.productDetails
);

export const selectSearchDetails = createSelector(
    [selectAllProducts],
    (allProducts) => allProducts?.searchDetails
);

export default allProductsSlice.reducer;
