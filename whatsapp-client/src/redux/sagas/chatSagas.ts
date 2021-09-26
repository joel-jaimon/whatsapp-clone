import { takeLatest, call, put } from "@redux-saga/core/effects";
import { saveNewChatOnMongoDb } from "api/saveNewChatOnMongoDb";
import { getActiveSocket } from "config/globalSocket";
import { getAccessToken } from "utils/accessToken";
import {
  createNewGroup,
  getInitialChats,
  newChatSuccessfullyCreated,
  newGroupCreated,
  onChatsLoadComplete,
  sendMsgStart,
  setActiveChat,
} from "../reducers/chat";
import store from "../store";

// Logout Saga
const getInitialChatData = async () => {
  const data = await fetch(`${process.env.REACT_APP_SERVER_URL}/chats`, {
    method: "GET",
    credentials: "include",
    headers: {
      authorization: `Bearer ${getAccessToken()}`,
    },
  });
  const response = await data.json();
  return response.data;
};

const getAllMessages = async (data: any) => {
  return await Promise.all(
    data.map(async (obj: any) => {
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/chats/${obj._id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      const res = await data.json();
      return [obj, res.data];
    })
  );
};

export function* initChatLoad() {
  yield takeLatest(getInitialChats.type, function* () {
    //@ts-ignore
    const _all = yield call(getInitialChatData);
    //@ts-ignore
    const chats = yield call(getAllMessages, _all);
    const chatsObj = chats.reduce((result: any, item: any, index: number) => {
      result[item[0]._id] = {
        chatInfo: item[0],
        messages: item[1],
      };
      return result;
    }, {});
    yield put(onChatsLoadComplete(chatsObj));
  });
}

// Send Msg
export function* initSendMsgStart() {
  yield takeLatest(sendMsgStart.type, function* (action: any) {
    //@ts-ignore
    const socket = yield call(getActiveSocket);

    // If chat was just created and this is the first message being sent
    if (action.payload.clientSide) {
      delete action.payload.clientSide;
      const v: number = yield call(
        saveNewChatOnMongoDb,
        store.getState().chatState.chat[action.payload.refId],
        "/create-new-chat"
      );
      if (v === 200) {
        yield put(newChatSuccessfullyCreated(action.payload.refId));
        socket.emit("updateOthersChats", {
          chatInfo: {
            ...store.getState().chatState.chat[action.payload.refId].chatInfo,
          },
          messages: [],
        });
        socket.emit("iTextMessage", {
          ...action.payload,
        });
      }
    } else {
      // chat already existed, sending message
      socket.emit("iTextMessage", action.payload);
    }
  });
}

export function* activeChatSwitch() {
  yield takeLatest(setActiveChat.type, function* (action: any) {
    // yield getActiveSocket().emit("switchActiveChat", action.payload);
  });
}

export function* handleGroupCreation() {
  yield takeLatest(createNewGroup.type, function* (action: any) {
    const v: number = yield call(
      saveNewChatOnMongoDb,
      store.getState().chatState.chat[action.payload._id],
      "/create-new-group"
    );
    //@ts-ignore
    const socket = yield call(getActiveSocket);
    if (v === 200) {
      socket.emit("updateOthersChats", {
        chatInfo: action.payload,
        messages: [],
      });
      yield put(newGroupCreated(action.payload._id));
    }
  });
}
