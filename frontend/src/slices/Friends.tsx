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
    populateFriends: (state, action) => {
      state.value = action.payload;
    },
    clearFriends: (state) => {
      state = {
        value: {
          username: "",
          room: "",
        },
      };
    },
  },
});

export const {populateFriends, clearFriends} = friendsSlice.actions;