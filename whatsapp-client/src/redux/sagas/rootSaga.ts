import { all } from "@redux-saga/core/effects";
import { initiateSignInSaga, initLogout } from "./authSagas";
import { initChatLoad, initSendMsgStart } from "./chatSagas";
import { initFileUpload } from "./uploadAttachmentSaga";

export default function* rootSaga() {
  yield all([
    initiateSignInSaga(),
    initLogout(),
    initChatLoad(),
    initSendMsgStart(),
    initFileUpload(),
  ]);
}
