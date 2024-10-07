import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    name: '',
    email: '',
    phone_number: '',
    isLoading: false,
    success: {},
    error: null,
    spinItem: false,
    menus: [],
    menu_id: '',
    admin_user_id: '',
    bank_name: '',
    account_name: '',
    account_number: '',
    payment_public_key: '',
    payment_secrete_key: ''
}

export const adminUser = createAsyncThunk(
    'admin/createAdminUser',
    async ({token, name, email, phone_number}, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://testbackendproject.pluralcode.academy/admin/create_admin_user', {
                name,
                email,
                phone_number
            },
            {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to create Admin user');
        }
    }
);

export const getMenus = createAsyncThunk(
    'admin/getAllMenus',
    async ({token}, { rejectWithValue }) => {
        try {
           const response = await axios.get('https://testbackendproject.pluralcode.academy/admin/get_menu', {
                headers: { 
                    Authorization: `Bearer ${token}` 
                } 
           })
           return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to get menus');
        }
    }
);

export const assignMenu = createAsyncThunk(
    'admin/asignMenu',
    async ({token, menu_id, admin_user_id}, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://testbackendproject.pluralcode.academy/admin/assign_menu', {
                menu_id,
                admin_user_id
            },{
                headers: { 
                    Authorization: `Bearer ${token}` 
                } 
            })
           return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to assign menu');
        }
    }
);

export const updateBankDetails = createAsyncThunk(
    'admin/updateDetails',
    async ({token, bank_name, account_name, account_number}, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://testbackendproject.pluralcode.academy/admin/update_bank_details', {
                bank_name,
                account_name,
                account_number
            },{
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update Bank details');
        }
    }
);

export const updateOnline = createAsyncThunk(
    'admin/updateOnline',
    async ({token, payment_public_key, payment_secrete_key}, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://testbackendproject.pluralcode.academy/admin/update_online_payment', {
                payment_public_key,
                payment_secrete_key
            }, {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update online details');
        }
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminFormData: (state, action) => {
            state[action.payload.field] = action.payload.value;
        },
        setUpdateDetails: (state, action) => {
            state[action.payload.field] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(adminUser.pending, (state) => {
            state.spinItem = true;
            state.error = null;
          })
          .addCase(adminUser.fulfilled, (state, action) => {
            state.success = action.payload;
            state.spinItem = false;
          })
          .addCase(adminUser.rejected, (state, action) => {
            state.spinItem = false;
            state.error = action.payload;
          })
          .addCase(getMenus.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(getMenus.fulfilled, (state, action) => {
              state.isLoading = false,
              state.menus = action.payload;
          })
          .addCase(getMenus.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
          })
          .addCase(assignMenu.pending, (state) => {
            state.spinItem = true;
            state.error = null;
          })
          .addCase(assignMenu.fulfilled, (state, action) => {
            state.spinItem = false;
            state.success = action.payload;
          })
          .addCase(assignMenu.rejected, (state, action) => {
            state.spinItem = false;
            state.error = action.payload;
          })
          .addCase(updateBankDetails.pending, (state) => {
            state.spinItem = true;
            state.error = null;
          })
          .addCase(updateBankDetails.fulfilled, (state, action) => {
              state.spinItem = false;
              state.success = action.payload;
          })
          .addCase(updateBankDetails.rejected, (state, action) => {
            state.spinItem = false;
            state.error = action.payload;
          })
          .addCase(updateOnline.pending, (state) => {
            state.spinItem = true;
            state.error = null;
          })
          .addCase(updateOnline.fulfilled, (state, action) => {
              state.spinItem = false;
              state.success = action.payload;
          })
          .addCase(updateOnline.rejected, (state, action) => {
            state.spinItem = false;
            state.error = action.payload;
          })
    }
})

export const { setAdminFormData, setUpdateDetails } = adminSlice.actions;
export default adminSlice.reducer;