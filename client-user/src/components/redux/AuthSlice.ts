import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import User from "../../types/User";
import { RootStore } from './Store';

// קריאת נתונים מ-Local Storage בעת עליית האפליקציה
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: storedToken ? JSON.parse(storedToken) : null,
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

// Async Thunk for Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('https://localhost:7004/api/Auth/login', credentials);
      console.log(response.data);
      return response.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async Thunk for Register
export const register = createAsyncThunk(
  'auth/register',
  async (newUser: { firstName: string; lastName: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('https://localhost:7004/api/Auth/register', { ...newUser, roleName: 'User' });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
      localStorage.removeItem("user");
      localStorage.removeItem("token");
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
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        console.log("action.error.message ", action.error.message);
        state.error = 'User doesn\'t exist';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<{ token: string, user: User }>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = 'User already exists, please login';
        console.log("action.error.message ", action.error.message);
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootStore) => state.auth;
export default authSlice.reducer;
