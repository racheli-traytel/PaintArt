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

export const deletePaintedDrawing = createAsyncThunk<
  number,
  number,
  { state: RootStore }
>(
  'paintedDrawings/deletePaintedDrawing',
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const drawing = state.deletedPaintedDrawings.deletedPaintedDrawings.find(d => d.id === id);
      if (!drawing) throw new Error('הציור לא נמצא');

      await api.delete(`/PaintedDrawing/${id}`);

      if (drawing.name)
     {
        await api.delete(`/upload/${drawing.name}`);
      }

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'מחיקה נכשלה');
    }
  }
);

export const recoverPaintedDrawing = createAsyncThunk(
    'paintedDrawings/recoverPaintedDrawing',
    async (id: number) => {
        await api.put(`/PaintedDrawing/Recover/${id}`);
        return id;
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
                state.error = action.payload as string || action.error.message || 'שגיאה בטעינת ציורים שנמחקו';
            })
            .addCase(deletePaintedDrawing.fulfilled, (state, action) => {
                state.deletedPaintedDrawings = state.deletedPaintedDrawings.filter((drawing) => drawing.id !== action.payload);
            })
            .addCase(deletePaintedDrawing.rejected, (state, action) => {
                state.error = action.payload as string || action.error.message || 'שגיאה במחיקת ציור';
            })
            .addCase(recoverPaintedDrawing.fulfilled, (state, action) => {
                state.deletedPaintedDrawings = state.deletedPaintedDrawings.filter((drawing) => drawing.id !== action.payload);
            })
            .addCase(recoverPaintedDrawing.rejected, (state, action) => {
                state.error = action.payload as string || action.error.message || 'שגיאה בשחזור ציור';
            });
    },
});

export const selectDeletedPaintedDrawings = (state: RootStore) => state.deletedPaintedDrawings;
export default deletedPaintedDrawingsSlice.reducer;
