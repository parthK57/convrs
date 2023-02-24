import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
  name: "activeChat",
  initialState: {
    value: {
      chatTitle: "Select Chat",
      room: "",
    },
  },
  reducers: {
    populateActiveChat: (state, action) => {
      state.value = action.payload;
    },
    clearActiveChat: (state) => {
      state = {
        value: {
          chatTitle: "Select Chat",
          room: "",
        },
      };
    },
  },
});

export const { populateActiveChat, clearActiveChat } = activeChatSlice.actions;
