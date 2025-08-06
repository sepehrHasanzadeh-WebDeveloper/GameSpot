import { createSlice } from "@reduxjs/toolkit";
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    activeUserId: null,
  },
  reducers: {
    setActiveUser: (state, action) => {
      state.activeUserId = action.payload;
    },
    addTempMessage: (state, action) => {
      state.messages.push({ ...action.payload, isTemp: true });
    },
    replaceTempMessage: (state, action) => {
      const { tempId, realMessage } = action.payload;
      const index = state.messages.findIndex((msg) => msg._id === tempId);
      if (index !== -1) {
        state.messages[index] = realMessage;
      }
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const {
  setActiveUser,
  addTempMessage,
  replaceTempMessage,
  setMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
