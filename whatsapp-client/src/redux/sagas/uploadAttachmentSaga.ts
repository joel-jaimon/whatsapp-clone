import { takeLatest, put, call } from "@redux-saga/core/effects";
import { saveNewChatOnMongoDb } from "api/saveNewChatOnMongoDb";
import { getActiveSocket } from "config/globalSocket";
import {
  resetFileAttachmentModal,
  uploadAttachments,
} from "../reducers/attachmentModal";
import {
  newChatSuccessfullyCreated,
  sendFileInit,
  updateSentFileUrl,
} from "../reducers/chat";
import store from "../store";
import { globalAxios } from "config/globalAxios";

export const uploadFile = async (attachmentArr: any[], msginfo: any) => {
  return await Promise.all(
    attachmentArr.map(async (_data: any) => {
      const formData = new FormData();
      formData.append("whatsapp-clone-message-file", _data[0]);

      const fileType = _data[0].type.split("/")[0];
      const msgType = ["image", "video"].includes(fileType)
        ? fileType
        : fileType === "audio"
        ? "voice"
        : "document";

      // const data = await fetch(
      //   `${process.env.REACT_APP_SERVER_URL}/file-upload/${msgType}`,
      //   {
      //     method: "POST",
      //     credentials: "include",
      //     headers: {},
      //     body: formData,
      //   }
      // );
      const { data } = await globalAxios({
        url: `/file-upload/${msgType}`,
        method: "POST",
        data: formData,
      });
      // const { path } = await data.json();
      store.dispatch(
        updateSentFileUrl({
          refId: msginfo.refId,
          //@ts-ignore
          updatedUrl: `${process.env.REACT_APP_SERVER_URL}/${data.path}`,
          tempId: _data[1].clientParams.tempId,
        })
      );

      getActiveSocket().emit("iTextMessage", {
        tempId: _data[1].clientParams.tempId,
        ...msginfo,
        msgType,
        msgParams: {
          ..._data[1].extraParam,
          //@ts-ignore
          url: `${process.env.REACT_APP_SERVER_URL}/${data.path}`,
        },
      });
    })
  );
};

const sendInitialMessages = (data: any) => {
  data.files.forEach((filedata: any) => {
    const fileType = filedata[0].type.split("/")[0];
    const msgType = ["image", "video"].includes(fileType)
      ? fileType
      : fileType === "audio"
      ? "voice"
      : "document";

    store.dispatch(
      sendFileInit({
        tempId: filedata[1].clientParams.tempId,
        ...data.msgInfo,
        timestamp: Date.now(),
        msgType,
        msgParams: filedata[1].extraParam,
      })
    );
  });
};

export function* initFileUpload() {
  yield takeLatest(uploadAttachments.type, function* (action: any) {
    yield put(resetFileAttachmentModal(null));
    // update UI (sending state)
    yield call(sendInitialMessages, action.payload);

    // if chat was just created
    if (action.payload.clientSide) {
      //@ts-ignore
      const socket = yield call(getActiveSocket);

      delete action.payload.clientSide;
      const v: number = yield call(
        saveNewChatOnMongoDb,
        store.getState().chatState.chat[action.payload.msgInfo.refId],
        "/create-new-chat"
      );
      if (v === 200) {
        yield put(newChatSuccessfullyCreated(action.payload.msgInfo.refId));
        socket.emit("updateOthersChats", {
          chatInfo: {
            ...store.getState().chatState.chat[action.payload.msgInfo.refId]
              .chatInfo,
          },
          messages: [],
        });
      }
    }

    //@ts-ignore
    yield call(uploadFile, action.payload.files, action.payload.msgInfo);
  });
}
