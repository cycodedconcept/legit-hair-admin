import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    order: {},
    orderDetails: {},
    isLoading: false,
    error: null,
    order_id: '',
    delivery_status: '',
    success: false,
    data: {},
    currentPage: 1,
    per_page: 10,
    pre_page: null,
    next_page: null,
    total: 0,
    total_pages: 0
}

export const getOrder = createAsyncThunk(
    'orders/fetchOrders',
    async ({token, page}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`https://testbackendproject.pluralcode.academy/admin/get_orders?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data;
        } catch (error) {
          return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

export const fetchDetails = createAsyncThunk(
    'orders/fetchDetails',
    async ({token, id}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`https://testbackendproject.pluralcode.academy/admin/orders_details?order_id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data;
        } catch (error) {
          return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

export const updateStatus = createAsyncThunk(
    'orders/changeStatus',
    async ({ token, order_id, delivery_status }, {rejectWithValue}) => {
        try {
            const response = await axios.post('https://testbackendproject.pluralcode.academy/admin/update_delivery_status', {
                order_id,
                delivery_status
            },
            {
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

const createOrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearStatusUpdate: (state) => {
            state.success = false; // Reset success state
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getOrder.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(getOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            const data = action.payload;

            state.order = data.data || [];
            state.currentPage = data.page || 1;
            state.per_page = data.per_page || 10;
            state.pre_page = data.pre_page || null;
            state.next_page = data.next_page || null;
            state.total = data.total || 0;
            state.total_pages = data.total_pages || 0;
          })
          .addCase(getOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Something went wrong';
          })
          .addCase(fetchDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(fetchDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = action.payload;
          })
          .addCase(fetchDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Something went wrong';
          })
          .addCase(updateStatus.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(updateStatus.fulfilled, (state, action) => {
            state.success = true;
            state.data = action.payload;
          })
          .addCase(updateStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Something went wrong';
          })
    }
});

export const { clearStatusUpdate } = createOrderSlice.actions; 
export default createOrderSlice.reducer;
