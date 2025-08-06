import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessagesState",
  async ({ user1, user2 }) => {
    const res = await axios.get(`http://localhost:6500/Message/userRes`, {
      withCredentials: true,
    });
    return res.data;
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessageState",
  async ({ senderId, receiverId, message }) => {
    const res = await axios.post(
      "http://localhost:6500/Message",
      {
        receiverId,
        message,
      },
      { withCredentials: true }
    );
    return res.data;
  }
);

const MessageSlice = createSlice({
  name: "messages",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.items.push(action.payload);
    },
    ClareMessage: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = "خطا در دریافت پیام ";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});
export const { addMessage, ClareMessage } = MessageSlice.actions;
export default MessageSlice.reducer;
