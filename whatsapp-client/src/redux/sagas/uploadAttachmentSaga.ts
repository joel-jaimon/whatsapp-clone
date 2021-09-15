import { takeLatest, put, call } from "@redux-saga/core/effects";
import {
  resetFileAttachmentModal,
  uploadAttachments,
} from "../reducers/attachmentModal";
import { sendFileInit, updateSentFileUrl } from "../reducers/chat";
import { getActiveSocket } from "../sockets/socketConnection";
import store from "../store";

const allowedTypes = ["image", "video", "audio"];

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

      const data = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/file-upload/${msgType}`,
        {
          method: "POST",
          credentials: "include",
          headers: {},
          body: formData,
        }
      );
      const { path } = await data.json();
      store.dispatch(
        updateSentFileUrl({
          refId: msginfo.refId,
          updatedUrl: `${process.env.REACT_APP_SERVER_URL}/${path}`,
          tempId: _data[1].clientParams.tempId,
        })
      );

      getActiveSocket().emit("iTextMessage", {
        tempId: _data[1].clientParams.tempId,
        ...msginfo,
        msgType,
        msgParams: {
          ..._data[1].extraParam,
          url: `${process.env.REACT_APP_SERVER_URL}/${path}`,
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
    yield call(sendInitialMessages, action.payload);
    //@ts-ignore
    yield call(uploadFile, action.payload.files, action.payload.msgInfo);
  });
}
