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
    populate: (state, action) => {
      state.value = action.payload;
    },
    clear: (state) => {
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

export const { populate, clear } = messagesSlice.actions;
