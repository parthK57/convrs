import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    value: {
      username: "",
      room: "",
    },
  },
  reducers: {
    populate: (state, action) => {
      state.value = action.payload;
    },
    clear: (state) => {
      state = {
        value: {
          username: "",
          room: "",
        },
      };
    },
  },
});

export const {populate, clear} = friendsSlice.actions;