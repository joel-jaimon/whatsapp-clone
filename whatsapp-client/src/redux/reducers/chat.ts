import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import colors from "../../data/colors.json";

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
    // attached to initChatLoad saga
    getInitialChats: (state) => {
      state.loading = true;
    },

    onChatsLoadComplete: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.chat = action.payload;
    },

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
          color: colors[Math.floor(Math.random() * colors.length - 1)],
        };
      });
    },
    updateTotalAuthUsers: (state, action: PayloadAction<any>) => {
      state.authUsers[action.payload.objectId] = {
        ...action.payload,
        color: colors[Math.floor(Math.random() * colors.length - 1)],
      };
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

    // attached to initSendMsgStart saga
    sendMsgStart: (state, action: PayloadAction<any>) => {
      state.chat[action.payload.refId].messages.push({
        ...action.payload,
        stillSending: true,
      });
    },

    sendMsgSuccessful: (state, action: PayloadAction<any>) => {
      const refArrIndex = state.chat[action.payload.refId].messages.findIndex(
        (e: any) => {
          return e.tempId === action.payload.tempId;
        }
      );
      state.chat[action.payload.refId].messages[refArrIndex]._id =
        action.payload._id;
      state.chat[action.payload.refId].messages[refArrIndex].stillSending =
        false;
      delete state.chat[action.payload.refId].messages[refArrIndex].tempId;
    },

    sendFileInit: (state, action: PayloadAction<any>) => {
      state.chat[action.payload.refId].messages.push({
        ...action.payload,
        stillSending: true,
      });
    },

    updateSentFileUrl: (state, action: PayloadAction<any>) => {
      const refArrIndex = state.chat[action.payload.refId].messages.findIndex(
        (e: any) => {
          return e.tempId === action.payload.tempId;
        }
      );

      state.chat[action.payload.refId].messages[refArrIndex].msgParams.url =
        action.payload.updatedUrl;
    },

    recieveMessage: (state, action: PayloadAction<any>) => {
      state.chat[action.payload.refId].messages.push({
        ...action.payload,
      });
    },

    sendMsgNotSuccessful: (state, action: PayloadAction<any>) => {
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
  sendMsgSuccessful,
  sendMsgNotSuccessful,
  sendMsgStart,
  recieveMessage,
  sendFileInit,
  updateSentFileUrl,
} = chatSlice.actions;
export default chatSlice;
