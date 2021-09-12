import info from "../../data/temp/chats/chats.json";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  authUsers: {},
  guestUsers: {},
  activeChat: null,
  chat: {
    "8bc44bbe-b4b0-492a-82d3-33de98251aa6": {
      chatInfo: info[0],
      messages: require("../../data/temp/chats/data/8bc44bbe-b4b0-492a-82d3-33de98251aa6.json"),
    },
    "22dd58e1-3df5-4b31-95c6-b53c9ac42d1f": {
      chatInfo: info[1],
      messages: require("../../data/temp/chats/data/22dd58e1-3df5-4b31-95c6-b53c9ac42d1f.json"),
    },
    "b2848bad-77de-4c9e-8de7-bb4492905bbb": {
      chatInfo: info[2],
      messages: require("../../data/temp/chats/data/b2848bad-77de-4c9e-8de7-bb4492905bbb.json"),
    },
  },
};

export const chatSlice = createSlice({
  name: "chatReducer",
  initialState,
  reducers: {
    // Handle auth users
    setTotalAuthUsers: (state, action: PayloadAction<any>) => {
      action.payload.forEach((user: any) => {
        state.authUsers[user._id] = {
          objectId: user._id,
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          avatar: user.avatar,
          createdOn: user.createdOn,
          about: user.about,
          status: user.status,
        };
      });
    },
    updateTotalAuthUsers: (state, action: PayloadAction<any>) => {
      state.authUsers[action.payload.objectId] = action.payload;
    },
    updateActiveAuthUser: (state, action: PayloadAction<any>) => {
      state.authUsers[action.payload].status = true;
    },
    updateInactiveAuthUser: (state, action: PayloadAction<any>) => {
      state.authUsers[action.payload].status = false;
    },

    // Handle guest users
    setTotalGuestUsers: (state, action: PayloadAction<any>) => {
      action.payload.forEach((user: any) => {
        state.authUsers[user._id] = {
          objectId: user._id,
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          avatar: user.avatar,
          createdOn: user.createdOn,
          about: user.about,
          status: user.status,
        };
      });
    },
    updateTotalGuestUsers: (state, action: PayloadAction<any>) => {
      state.authUsers[action.payload.objectId] = action.payload;
    },
    updateActiveGuestUser: (state, action: PayloadAction<any>) => {
      state.authUsers[action.payload].status = true;
    },
    updateInactiveGuestUser: (state, action: PayloadAction<any>) => {
      state.authUsers[action.payload].status = false;
    },

    // handle active chat
    setActiveChat: (state, action: PayloadAction<any>) => {
      state.activeChat = action.payload;
    },
  },
});

export const {
  setActiveChat,
  setTotalAuthUsers,
  setTotalGuestUsers,
  updateActiveAuthUser,
  updateActiveGuestUser,
  updateInactiveAuthUser,
  updateInactiveGuestUser,
  updateTotalAuthUsers,
  updateTotalGuestUsers,
} = chatSlice.actions;
export default chatSlice;
