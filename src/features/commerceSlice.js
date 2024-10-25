import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    delivery_address: '',
    delivery_state: '',
    delivery_country: '',
    amount_paid: '',
    additional_information: '',
    payment_method: '',
    delivery_landmark: '',
    invoice_id: '',
    customer_name: '',
    customer_phonenumber: '',
    customer_email: '',
    error: null,
    success: false,
    data: {},
    spinItem: false,
    redirect_url: ''
}

export const createInvoice = createAsyncThunk(
    'commerce/createInvoice',
    async ({token, 
         products, delivery_address, 
         delivery_state, delivery_country, 
         amount_paid, additional_information, 
         payment_method, delivery_landmark, invoice_id,
         customer_name, customer_phonenumber, customer_email, redirect_url
        }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://testbackendproject.pluralcode.academy/admin/create_invoice', {
                products, delivery_address, 
                delivery_state, delivery_country, 
                amount_paid, additional_information, 
                payment_method, delivery_landmark, invoice_id,
                customer_name, customer_phonenumber, customer_email,redirect_url
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data;
        } catch (error) {
          return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const commerceSlice = createSlice({
    name: 'commerce',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(createInvoice.pending, (state) => {
            state.success = false;
            state.spinItem = true;
            state.error = null;
          })
          .addCase(createInvoice.fulfilled, (state, action) => {
            state.success = true;
            state.spinItem = false;
            state.data = action.payload;
          })
          .addCase(createInvoice.rejected, (state, action) => {
            state.success = false;
            state.spinItem = false;
            state.error = action.payload || 'Something went wrong';
          })
    }
});

export default commerceSlice.reducer;

