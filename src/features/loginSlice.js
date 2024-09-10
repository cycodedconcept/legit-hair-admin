import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    login: '',
    password: '',
    spinItem: false,
    error: null,
    successful: false,
    data: []
};

export const submitForm = createAsyncThunk(
    'login',
    async ({ login, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://testbackendproject.pluralcode.academy/admin/login-admin', {
                login,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            localStorage.setItem("key", response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const formLoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginFormData: (state, action) => {
          state[action.payload.field] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(submitForm.pending, (state) => {
            state.spinItem = true;
            state.error = null
        })
        .addCase(submitForm.fulfilled, (state, action) => {
            state.spinItem = false;
            state.successful = true;
            state.data = action.payload
        })
        .addCase(submitForm.rejected, (state, action) => {
            state.spinItem = false;
            state.error = action.payload;
        });
    }
})

export const { setLoginFormData } = formLoginSlice.actions;
export default formLoginSlice.reducer;