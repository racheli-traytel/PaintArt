import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Drawing from '../../types/drawing';
import { RootStore } from './Store';


const baseURL= import.meta.env.VITE_API_URL
// Async thunk to fetch popular drawings of a specific user
export const fetchPopularDrawings = createAsyncThunk(
  'drawings/fetchPopularDrawings',
  async (userId: number) => {
    const response = await axios.get(`${baseURL}/drawings/popular/${userId}`);
    return response.data;
  }
);

// Popular drawings slice
const popularDrawingsSlice = createSlice({
  name: 'popularDrawings',
  initialState: {
    items: [] as Drawing[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularDrawings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPopularDrawings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPopularDrawings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || 'Failed to fetch popular drawings';
      });
  },
});

export const selectPopularDrawings = (state: RootStore) => state.popularDrawings;

export default popularDrawingsSlice.reducer;
