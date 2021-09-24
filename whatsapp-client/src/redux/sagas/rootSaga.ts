import { all } from "@redux-saga/core/effects";
import {
  initAuthuserInfoUpdateSaga,
  initiateSignInSaga,
  initLogout,
} from "./authSagas";
import {
  activeChatSwitch,
  handleGroupCreation,
  initChatLoad,
  initSendMsgStart,
} from "./chatSagas";
import { initFileUpload } from "./uploadAttachmentSaga";

export default function* rootSaga() {
  yield all([
    initiateSignInSaga(),
    initLogout(),
    initChatLoad(),
    initSendMsgStart(),
    initFileUpload(),
    handleGroupCreation(),
    // activeChatSwitch(),
    initAuthuserInfoUpdateSaga(),
  ]);
}
