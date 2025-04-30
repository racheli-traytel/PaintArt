import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import User from "../../types/User";
import { RootStore } from './Store';

// קריאת נתונים מ-Session Storage בעת עליית האפליקציה
const storedUser = sessionStorage.getItem("user");
const storedToken = sessionStorage.getItem("token");
const baseURL= import.meta.env.VITE_API_URL

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: storedToken,
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

// פונקציית עזר להחזרת הודעת שגיאה
const getErrorMessage = (payload: any, fallback: string) => {
  if (typeof payload === 'string') return payload;
  if (payload?.message) return payload.message;
  return fallback;
};

// Async Thunk for Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURL}/Auth/login`, credentials);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Async Thunk for Register
export const register = createAsyncThunk(
  'auth/register',
  async (
    newUser: { firstName: string; lastName: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`${baseURL}/Auth/register`, {
        ...newUser,
        roleName: 'User',
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Register failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload, 'Login failed');
        console.log("state.error",state.error);
        
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        sessionStorage.setItem('user', JSON.stringify(action.payload.user));
        sessionStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload, 'Register failed');
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootStore) => state.auth;
export default authSlice.reducer;
