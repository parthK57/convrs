import { createSlice } from "@reduxjs/toolkit";

export const modalTogglerSlice = createSlice({
  name: "modalToggler",
  initialState: {
    value: {
      AddUserModal: false,
      RemoveUserModal: false,
      CreateGroupModal: false,
      AddMemeberModal: false,
      RemoveMemberModal: false,
    },
  },
  reducers: {
    setAddUserModal: (state, action) => {
      state.value.AddUserModal = action.payload;
    },
    setRemoveUserModal: (state, action) => {
      state.value.RemoveUserModal = action.payload;
    },
    setCreateGroupModal: (state, action) => {
      state.value.CreateGroupModal = action.payload;
    },
    setAddMemberModal: (state, action) => {
      state.value.AddMemeberModal = action.payload;
    },
    setRemoveMemberModal: (state, action) => {
      state.value.RemoveMemberModal = action.payload;
    },
  },
});

export const {
  setAddUserModal,
  setRemoveUserModal,
  setCreateGroupModal,
  setAddMemberModal,
  setRemoveMemberModal,
} = modalTogglerSlice.actions;
