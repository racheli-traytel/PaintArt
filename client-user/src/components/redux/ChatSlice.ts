// store/chatSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatState {
  messages: Message[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  status: 'idle',
  error: null,
};

const baseURL= import.meta.env.VITE_API_URL
// ✅ כאן התיקון
export const sendChatMessage = createAsyncThunk(
  'chat/sendChatMessage',
  async (message: string) => {
    const response = await axios.post(`${baseURL}/ChatApi/chat`, {
      message,
      systemRole: "אתה מומחה לציורים, תן תשובות טובות",
    });

    // פענוח JSON מתוך המחרוזת שמוחזרת
    const parsed = JSON.parse(response.data.response);

    // מחזירים את תוכן ההודעה שהבוט החזיר
    return parsed.choices[0].message.content;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({ sender: 'user', text: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('תשובה מהשרת:', action.payload);
        state.messages.push({ sender: 'bot', text: action.payload });
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.messages.push({ sender: 'bot', text: "שגיאה בשליחת ההודעה" });
        state.error = action.error.message || "שגיאה לא ידועה";
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;