import { createSlice } from "@reduxjs/toolkit";

export const chatMenuStateSlice = createSlice({
  name: "chatMenuSlice",
  initialState: {
    value: {
      isActive: false,
    },
  },
  reducers: {
    setChatMenu: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChatMenu } = chatMenuStateSlice.actions;
