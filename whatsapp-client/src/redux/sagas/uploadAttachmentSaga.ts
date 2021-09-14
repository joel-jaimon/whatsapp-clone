import { takeLatest, call, put } from "@redux-saga/core/effects";
import { createFileParams } from "../../utils/createFileParams";
import { uploadAttachments } from "../reducers/attachmentModal";
import { sendFileInit } from "../reducers/chat";

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

export function* initFileUpload() {
  yield takeLatest(uploadAttachments.type, function* (action: any) {
    action.payload.files.forEach(function* (file: File) {
      const fileType = file.type.split("/")[0];
      const msgType = ["image", "video"].includes(fileType)
        ? fileType
        : fileType === "audio"
        ? "voice"
        : "document";
      yield put(
        sendFileInit({
          ...action.payload.msgInfo,
          msgType,
          msgParams: createFileParams(file, msgType),
        })
      );
    });
    //@ts-ignore
    const res = yield call(uploadFile, action.payload.files);
    console.log(res);
    yield console.log(action.payload);
  });
}
