import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootStore } from './Store';
import PaintedDrawing from '../../types/PaintedDrawing';
import api from '../api';

export const fetchDeletedPaintedDrawingsByUserId = createAsyncThunk(
    'paintedDrawings/fetchPaintedDrawingsByUserId',
    async (userId: number) => {
        const response = await api.get(`PaintedDrawing/deleted/user/${userId}`);
        return response.data;
    }
);

export const deletePaintedDrawing = createAsyncThunk(
    'paintedDrawings/deletePaintedDrawing',
    async (id: number) => {
        await api.delete(`/PaintedDrawing/${id}`);
        return id; // מחזירים רק את ה-ID של הציור שנמחק
    }
);

export const recoverPaintedDrawing = createAsyncThunk(
    'paintedDrawings/drecoverPaintedDrawing',
    async (id: number) => {
        await api.put(`/PaintedDrawing/Recover/${id}`);
        return id; // מחזירים רק את ה-ID של הציור ששוחזר
    }
);


const deletedPaintedDrawingsSlice = createSlice({
    name: 'paintedDrawings',
    initialState: { deletedPaintedDrawings: [] as PaintedDrawing[], status: 'idle', error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeletedPaintedDrawingsByUserId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDeletedPaintedDrawingsByUserId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.deletedPaintedDrawings = action.payload;
            })
            .addCase(fetchDeletedPaintedDrawingsByUserId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || action.error.message || 'Failed to fetch painted drawings';
            })
            .addCase(deletePaintedDrawing.fulfilled, (state, action) => {
                state.deletedPaintedDrawings = state.deletedPaintedDrawings.filter((drawing) => drawing.id !== action.payload);
            })
            .addCase(deletePaintedDrawing.rejected, (state, action) => {
                state.error = action.payload as string || action.error.message || 'Failed to delete painted drawing';
            })
            .addCase(recoverPaintedDrawing.fulfilled, (state, action) => {
                state.deletedPaintedDrawings = state.deletedPaintedDrawings.filter((drawing) => drawing.id !== action.payload);
            })
            .addCase(recoverPaintedDrawing.rejected, (state, action) => {
                state.error = action.payload as string || action.error.message || 'Failed to recover painted drawing';
            });


    },
});

export const selectDeletedPaintedDrawings = (state: RootStore) => state.deletedPaintedDrawings;

export default deletedPaintedDrawingsSlice.reducer;
