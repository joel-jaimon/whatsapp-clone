import { takeLatest, put, call } from "@redux-saga/core/effects";
import { uploadAttachments } from "../reducers/attachmentModal";
import { sendFileInit } from "../reducers/chat";
import store from "../store";

const allowedTypes = ["image", "video", "audio"];

export const uploadFile = async (filesArr: any[]) => {
  return await Promise.all(
    filesArr.map(async (_data: any) => {
      const formData = new FormData();
      formData.append("whatsapp-clone-message-file", _data);

      const fileType = _data.type.split("/")[0];
      console.log(_data);
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/file-upload/${
          allowedTypes.includes(fileType)
            ? fileType === "audio"
              ? "voice"
              : fileType
            : "document"
        }`,
        {
          method: "POST",
          credentials: "include",
          headers: {},
          body: formData,
        }
      );
      const response = await data.json();
      return response;
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
    console.log({
      ...data.msgInfo,
      msgType,
      msgParams: filedata[1].extraParam,
      clientParams: filedata[1].clientParams,
    });
    store.dispatch(
      sendFileInit({
        ...data.msgInfo,
        msgType,
        msgParams: filedata[1].extraParam,
        clientParams: filedata[1].clientParams,
      })
    );
  });
};

export function* initFileUpload() {
  yield takeLatest(uploadAttachments.type, function* (action: any) {
    yield call(sendInitialMessages, action.payload);
    yield console.log("Voila");
    //@ts-ignore
    // const res = yield call(uploadFile, action.payload.files);
    // console.log(res);
  });
}
