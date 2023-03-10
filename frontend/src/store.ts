import { configureStore } from "@reduxjs/toolkit";
import { friendsSlice } from "./slices/Friends";
import { messagesSlice } from "./slices/Messages";
import { activeChatSlice } from "./slices/ActiveChat";
import { groupChatModeSlice } from "./slices/GroupChatMode";
import { newMessagesSlice } from "./slices/NewMessages";
import { chatMenuStateSlice } from "./slices/ChatMenuState";
import { modalTogglerSlice } from "./slices/ModalToggler";

export const store = configureStore({
  reducer: {
    friends: friendsSlice.reducer,
    messages: messagesSlice.reducer,
    activeChat: activeChatSlice.reducer,
    groupChatMode: groupChatModeSlice.reducer,
    newMessages: newMessagesSlice.reducer,
    chatMenuState: chatMenuStateSlice.reducer,
    modalToggler: modalTogglerSlice.reducer,
  },
});
