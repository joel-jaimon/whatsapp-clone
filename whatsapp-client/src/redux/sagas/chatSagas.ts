import { takeLatest, call, put } from "@redux-saga/core/effects";
import { getAccessToken } from "../../utils/accessToken";
import { getInitialChats, onChatsLoadComplete } from "../reducers/chat";

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
