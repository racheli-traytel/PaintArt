import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Drawing from '../../types/drawing';  // עדכן את הנתיב אם צריך
import { RootStore } from './Store';
import api from '../api';

const baseURL= import.meta.env.VITE_API_URL
export const fetchAllDrawings = createAsyncThunk(
  'drawings/fetchAllDrawings',
  async () => {
    const response = await axios.get(`${baseURL}/Drawing`);
    return response.data;
  }
);

export const fetchTopRatedDrawings = createAsyncThunk(
  'drawings/fetchTopRatedDrawings',
  async (count: number) => {
    const response = await axios.get(`${baseURL}/Drawing/top-rated/${count}`);
    console.log("response", response);
    return response.data;
  }
);


// Async thunk לחיפוש ציורים לפי מילה
export const searchDrawings = createAsyncThunk(
  'drawings/searchDrawings',
  async (searchTerm: string) => {
    const response = await axios.get(`${baseURL}/Drawing/Search/${searchTerm}`);
    return response.data;
  }
);

// Async thunk לשליפת ציורים לפי קטגוריה
export const fetchDrawingsByCategory = createAsyncThunk(
  'drawings/fetchDrawingsByCategory',
  async (categoryId: number) => {
    const response = await axios.get(`${baseURL}/Drawing/ByCategory/${categoryId}`);
    return response.data.worksheets;
  }
);

// Async thunk להוספת דירוג לציור
export const addRating = createAsyncThunk(
  'drawings/addRating',
  async ({ drawingId, value }: { drawingId: number, value: number }) => {
    const response = await api.post(
      `/Drawing/Rate/${drawingId}`,
      value,  // שלח רק את הדירוג כערך מספרי ולא כ-object
      {
        headers: {
          'Content-Type': 'application/json',  // לא לשכוח להוסיף את הכותרת
        },
      }
    );
    return response.data;
  }
);

// Async thunk לקבלת דירוג ממוצע לציור
export const fetchRating = createAsyncThunk(
  'drawings/fetchRating',
  async (drawingId: number) => {
    const response = await api.get(`/Drawing/${drawingId}`);
    return response.data.avgRating;
  }
);

// Async thunk להוספת ציור
export const addDrawing = createAsyncThunk(
  'drawings/addDrawing',
  async ({ name, title, description, category, imageUrl, userId, isGeneratedByAI }: { name: string, title: string, description: string, category: number, imageUrl: string, userId: number, isGeneratedByAI: boolean }) => {
    console.log(name, title, description, category, imageUrl, userId, isGeneratedByAI);
    const response = await api.post('/Drawing', { name, title, description, category, imageUrl, userId, isGeneratedByAI }, {
    });
    return response.data;
  }
);

// Async thunk לשליפת ציורים לפי userId
export const fetchDrawingsByUser = createAsyncThunk(
  'drawings/fetchDrawingsByUser',
  async (userId: number) => {
    const response = await api.get(`/Drawing/ByUser/${userId}`);
    return response.data; // מניח שהשרת מחזיר את הציורים כ-array
  }
);

// Drawing slice
const drawingsSlice = createSlice({
  name: 'drawings',
  initialState: {     drawings: [] as Drawing[], 
    topRatedDrawings: [] as Drawing[], 
    userDrawings: [] as Drawing[], // הוספנו משתנה חדש לאחסון ציורים לפי משתמש
    status: 'idle', 
    error: null as string | null  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // עבור חיפוש ציורים
      .addCase(searchDrawings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchDrawings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.drawings = action.payload;
      })
      .addCase(searchDrawings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || 'Failed to fetch drawings';
      })
      // עבור ציורים לפי קטגוריה
      .addCase(fetchDrawingsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDrawingsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        
        state.drawings = action.payload;
      })
      .addCase(fetchDrawingsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || 'Failed to fetch drawings';
      })
      // הוספת דירוג לציור
      .addCase(addRating.fulfilled, (state, action) => {
        console.log("good");
        const updatedDrawing = action.payload;
        console.log("action.payload", action.payload)
        const index = state.drawings.findIndex(d => d.id === updatedDrawing.id);
        const index2=state.topRatedDrawings.findIndex(d=>d.id==updatedDrawing.id)
        console.log("index2",index2);
        
        if (index !== -1) {
          state.drawings[index] = updatedDrawing;
        }
        if (index2 !== -1) {
          state.topRatedDrawings[index] = updatedDrawing;
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        console.log("eror", action.error.message);

        state.error = action.payload as string || action.error.message || 'Failed to add rating';
      })
      // קבלת דירוג לציור
      .addCase(fetchRating.fulfilled, (state, action) => {
        const { drawingId, avgRating } = action.payload;
        const drawing = state.drawings.find(d => d.id === drawingId);
        if (drawing) {
          drawing.avgRating = avgRating;
        }
      })
      .addCase(fetchRating.rejected, (state, action) => {
        state.error = action.payload as string || action.error.message || 'Failed to fetch rating';
      })
      // הוספת ציור
      .addCase(addDrawing.fulfilled, (state, action) => {
        console.log("succeed");
        
        state.drawings.push(action.payload);
      })
      .addCase(addDrawing.rejected, (state, action) => {
        
        console.log("action.error.message", action.error.message);

        state.error = action.payload as string || action.error.message || 'Failed to add drawing';
      })
      .addCase(fetchTopRatedDrawings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopRatedDrawings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topRatedDrawings = action.payload;
        console.log("action.payload;", action.payload);

      })
      .addCase(fetchTopRatedDrawings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || 'Failed to fetch rating';
      })
      .addCase(fetchAllDrawings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllDrawings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.drawings = action.payload;
      })
      .addCase(fetchAllDrawings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || 'Failed to fetch all drawings';
      })
      // עבור ציורים של משתמש
      .addCase(fetchDrawingsByUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDrawingsByUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDrawings = action.payload; // שומר את הציורים במשתנה החדש
      })
      .addCase(fetchDrawingsByUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || 'Failed to fetch drawings by user';
      })
      

  },
});

export const selectDrawings = (state: RootStore) => state.drawings;

export default drawingsSlice.reducer;




