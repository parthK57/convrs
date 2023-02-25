import { createSlice } from "@reduxjs/toolkit";

export const groupChatModeSlice = createSlice({
  name: "groupChatMode",
  initialState: {
    value: {
      isActive: false,
    },
  },
  reducers: {
    setGroupChatMode: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setGroupChatMode } = groupChatModeSlice.actions;
