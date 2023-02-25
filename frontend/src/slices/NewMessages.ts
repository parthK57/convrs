import { createSlice } from "@reduxjs/toolkit";

export const newMessagesSlice = createSlice({
  name: "newMessages",
  initialState: {
    value: [
      {
        username: "",
        message: "",
        room: "",
      },
    ],
  },
  reducers: {
    populateNewMessages: (state, action) => {
      state.value = action.payload;
    },
    clearNewMessages: (state) => {
      state = {
        value: [
          {
            username: "",
            message: "",
            room: "",
          },
        ],
      };
    },
  },
});

export const { populateNewMessages, clearNewMessages } = newMessagesSlice.actions;
