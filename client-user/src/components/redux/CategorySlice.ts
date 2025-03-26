import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Category from '../../types/category';
import { RootStore } from './store';

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('https://localhost:7004/categories');
  return response.data;
});

// Categories slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { items: [] as Category[], 
    status: 'idle', 
    error: null as string | null},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || 'Failed to add recipe';
    });
  },
});
export const selectCategories = (state: RootStore) => state.categories

export default categoriesSlice.reducer;
