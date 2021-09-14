import { takeLatest, call, put } from "@redux-saga/core/effects";
import { uploadAttachments } from "../reducers/attachmentModal";

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
            : "file"
        }`,
        {
          method: "POST",
          credentials: "include",
          headers: {},
          body: formData,
        }
      );
      const response = await data.json();
      console.log(response);
      return response;
    })
  );
};

export function* initFileUpload() {
  yield takeLatest(uploadAttachments.type, function* (action: any) {
    //@ts-ignore
    const res = yield call(uploadFile, action.payload.files);
    console.log(res);
    yield console.log(action.payload);
  });
}
