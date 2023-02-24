import { configureStore } from "@reduxjs/toolkit";
import { friendsSlice } from "./slices/Friends";
import { messagesSlice } from "./slices/Messages";

export const store = configureStore({
  reducer: {
    friends: friendsSlice.reducer,
    messages: messagesSlice.reducer,
  },
});
