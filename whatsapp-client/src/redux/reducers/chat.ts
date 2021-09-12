import info from "../../data/temp/chats/chats.json";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  totalUsers: {},
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
    setTotalUsers: (state, action: PayloadAction<any>) => {
      action.payload.forEach((user: any) => {
        state.totalUsers[user._id] = {
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
    updateTotalUsers: (state, action: PayloadAction<any>) => {
      state.totalUsers[action.payload.objectId] = action.payload;
    },
    updateActiveUser: (state, action: PayloadAction<any>) => {
      state.totalUsers[action.payload].status = true;
    },
    updateInactiveUser: (state, action: PayloadAction<any>) => {
      state.totalUsers[action.payload].status = false;
    },
    setActiveChat: (state, action: PayloadAction<any>) => {
      state.activeChat = action.payload;
    },
  },
});

export const {
  setActiveChat,
  setTotalUsers,
  updateActiveUser,
  updateInactiveUser,
  updateTotalUsers,
} = chatSlice.actions;
export default chatSlice;
