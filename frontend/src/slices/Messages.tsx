import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    value: [
      {
        username: "",
        message: "",
      },
    ],
  },
  reducers: {
    populateMessages: (state, action) => {
      state.value = action.payload;
    },
    clearMessages: (state) => {
      state = {
        value: [
          {
            username: "",
            message: "",
          },
        ],
      };
    },
  },
});

export const { populateMessages, clearMessages } = messagesSlice.actions;
