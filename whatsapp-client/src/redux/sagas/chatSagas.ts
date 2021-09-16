import { takeLatest, call, put } from "@redux-saga/core/effects";
import { getAccessToken } from "../../utils/accessToken";
import {
  getInitialChats,
  onChatsLoadComplete,
  sendMsgStart,
  setActiveChat,
} from "../reducers/chat";
import { getActiveSocket } from "../sockets/socketConnection";

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
    switch (action.payload.msgType) {
      case "text":
        socket.emit("iTextMessage", action.payload);
        break;
      default:
        break;
    }
  });
}

export function* activeChatSwitch() {
  yield takeLatest(setActiveChat.type, function* (action: any) {
    // yield getActiveSocket().emit("switchActiveChat", action.payload);
  });
}
