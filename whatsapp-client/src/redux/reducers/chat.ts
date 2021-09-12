import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  authUsers: {},
  guestUsers: {},
  activeChat: null,
  loading: true,
  chat: {},
};

export const chatSlice = createSlice({
  name: "chatReducer",
  initialState,
  reducers: {
    getInitialChats: (state) => {
      state.loading = true;
    },

    onChatsLoadComplete: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.chat = action.payload;
    },

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
          lastSeen: user.lastSeen,
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
      state.authUsers[action.payload._id].status = false;
      state.authUsers[action.payload._id].lastSeen = action.payload.lastSeen;
    },

    // handle active chat
    setActiveChat: (state, action: PayloadAction<any>) => {
      state.activeChat = action.payload;
    },

    // // Handle guest users
    // setTotalGuestUsers: (state, action: PayloadAction<any>) => {
    //   action.payload.forEach((user: any) => {
    //     state.authUsers[user._id] = {
    //       objectId: user._id,
    //       uid: user.uid,
    //       displayName: user.displayName,
    //       email: user.email,
    //       avatar: user.avatar,
    //       createdOn: user.createdOn,
    //       about: user.about,
    //       status: user.status,
    //     };
    //   });
    // },
    // updateTotalGuestUsers: (state, action: PayloadAction<any>) => {
    //   state.authUsers[action.payload.objectId] = action.payload;
    // },
    // updateActiveGuestUser: (state, action: PayloadAction<any>) => {
    //   state.authUsers[action.payload].status = true;
    // },
    // updateInactiveGuestUser: (state, action: PayloadAction<any>) => {
    //   state.authUsers[action.payload].status = false;
    // },
  },
});

export const {
  setActiveChat,
  setTotalAuthUsers,
  updateActiveAuthUser,
  updateInactiveAuthUser,
  updateTotalAuthUsers,
  getInitialChats,
  onChatsLoadComplete,
} = chatSlice.actions;
export default chatSlice;
