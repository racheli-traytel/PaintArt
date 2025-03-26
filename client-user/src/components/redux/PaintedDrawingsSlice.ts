import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStore } from './Store';
import PaintedDrawing from '../../types/PaintedDrawing';



// Async thunk לשליפת ציורים צבועים לפי userId
export const fetchPaintedDrawingsByUserId = createAsyncThunk(
  'paintedDrawings/fetchPaintedDrawingsByUserId',
  async (userId: number) => {
    const response = await axios.get(`https://localhost:7004/api/PaintedDrawing/user/${userId}`);
    return response.data;
  }
);

// Async thunk להוספת ציור צבוע חדש
export const addPaintedDrawing = createAsyncThunk(
  'paintedDrawings/addPaintedDrawing',
  async ({drawingId,userId,imageUrl,name}:{drawingId:number,userId:number,imageUrl:string,name:string}) => {
    const response = await axios.post('https://localhost:7004/api/PaintedDrawing',{drawingId,userId,imageUrl,name});
    return response.data;
  }
);

export const updatePaintedDrawing = createAsyncThunk(
  'paintedDrawings/updatePaintedDrawing',
  async ({id,drawingId, userId, imageUrl,name }: { drawingId: number, userId: number, imageUrl: string,name:string,id:number }) => {
    const response = await axios.put(`https://localhost:7004/api/PaintedDrawing/${id}`, {
      drawingId,
      userId,
      imageUrl,
      name
    });
    return response.data;
  }
);

const paintedDrawingsSlice = createSlice({
  name: 'paintedDrawings',
  initialState: { paintedDrawings: [] as PaintedDrawing[], status: 'idle', error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaintedDrawingsByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaintedDrawingsByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.paintedDrawings = action.payload;
      })
      .addCase(fetchPaintedDrawingsByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || 'Failed to fetch painted drawings';
      })
      .addCase(addPaintedDrawing.fulfilled, (state, action) => {
        state.paintedDrawings.push(action.payload);
      })
      .addCase(addPaintedDrawing.rejected, (state, action) => {
        state.error = action.payload as string || action.error.message || 'Failed to add painted drawing';
      }) 
     .addCase(updatePaintedDrawing.fulfilled, (state, action) => {
        const index = state.paintedDrawings.findIndex((drawing) => drawing.id === action.payload.id);
        if (index !== -1) {
          state.paintedDrawings[index] = action.payload;
        }
      })
      .addCase(updatePaintedDrawing.rejected, (state, action) => {
        state.error = action.payload as string || action.error.message || 'Failed to update painted drawing';
      });
      ;
  },
});

export const selectPaintedDrawings = (state: RootStore) => state.paintedDrawings;

export default paintedDrawingsSlice.reducer;
