import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import colors from "data/colors.json";
import { ObjectID } from "bson";
import { ChatStateType } from "types/chatSlice.types";
import { AuthUserType } from "types/authSlice.types";

const initialState: ChatStateType = {
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
      state.loading = false;
      state.chat = action.payload;
    },

    setTotalAuthUsers: (state, action: PayloadAction<any>) => {
      action.payload.forEach((user: AuthUserType) => {
        state.authUsers[user._id as string] = {
          objectId: user._id as string,
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

    updateAuthUsersInfo: (state, action: PayloadAction<any>) => {
      state.authUsers[action.payload.objectId] = {
        ...state.authUsers[action.payload.objectId],
        ...action.payload,
      };
    },

    updateActiveAuthUser: (state, action: PayloadAction<any>) => {
      state.authUsers[action.payload].status = true;
    },
    updateInactiveAuthUser: (state, action: PayloadAction<any>) => {
      try {
        state.authUsers[action.payload._id].status = false;
        state.authUsers[action.payload._id].lastSeen = action.payload.lastSeen;
      } catch {}
    },

    // handle active chat
    setActiveChat: (state, action: PayloadAction<any>) => {
      state.activeChat = action.payload.switchTo;
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

    replaceDownloadedVideoURL: (state, action: PayloadAction<any>) => {
      const refArrIndex = state.chat[action.payload.chatId].messages.findIndex(
        (e: any) => {
          return e._id === action.payload.messageId;
        }
      );

      state.chat[action.payload.chatId].messages[refArrIndex].msgParams.url =
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

    // When user starts a new chat
    createNewChat: (state, action: PayloadAction<any>) => {
      const assignedId = new ObjectID().toString();
      state.chat[assignedId] = {
        chatInfo: {
          _id: assignedId,
          ...action.payload,
          clientSide: true,
        },
        messages: [],
      };

      state.activeChat = assignedId;
    },

    createNewGroup: (state, action: PayloadAction<any>) => {
      state.chat[action.payload._id] = {
        chatInfo: action.payload,
        messages: [],
        stillSaving: true,
      };
      state.activeChat = action.payload._id;
    },

    newGroupCreated: (state, action: PayloadAction<any>) => {
      delete state.chat[action.payload._id].stillSaving;
    },

    // When user starts a new chat
    updateChats: (state, action: PayloadAction<any>) => {
      state.chat[action.payload.chatInfo._id] = action.payload;
    },

    // when new chat is successfully created
    newChatSuccessfullyCreated: (state, action: PayloadAction<any>) => {
      delete state.chat[action.payload].chatInfo.clientSide;
    },

    // On failure
    newChatCreationFailed: (state, action: PayloadAction<any>) => {
      state.activeChat = action.payload;
    },

    initGroupInfoUpdate: (state, action) => {
      state.chat[action.payload.groupId].chatInfo.loading = true;
    },

    groupInfoUpdateSuccessfull: (state, action) => {
      state.chat[action.payload.groupId].chatInfo = {
        ...state.chat[action.payload.groupId].chatInfo,
        ...action.payload.updatedParams,
      };
    },

    groupInfoUpdateFailed: (state, action) => {
      state.chat[action.payload.groupId].chatInfo.loading = false;
    },

    updateLastViewedChatsTimestampOfOtherUser: (
      state,
      action: PayloadAction<any>
    ) => {
      // const {
      //   prevActiveChat: { prevActiveChatId, lastViewed },
      //   userObjectId,
      // } = action.payload;
      // state.chat[prevActiveChatId].chatInfo.participants.find(
      //   (user: any) => user.objectId === userObjectId
      // ).lastViewed = lastViewed;
    },

    updateOtherUsersActiveChat: (state, action: PayloadAction<any>) => {
      // state.authUsers[action.payload.userObjectId].currentlyOn =
      //   action.payload.currentlyOn;
    },
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
  updateLastViewedChatsTimestampOfOtherUser,
  updateOtherUsersActiveChat,
  newChatSuccessfullyCreated,
  newChatCreationFailed,
  createNewChat,
  updateChats,
  createNewGroup,
  newGroupCreated,
  updateAuthUsersInfo,
  groupInfoUpdateFailed,
  groupInfoUpdateSuccessfull,
  initGroupInfoUpdate,
  replaceDownloadedVideoURL,
} = chatSlice.actions;
export default chatSlice;
