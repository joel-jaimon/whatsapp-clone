import { all } from "@redux-saga/core/effects";
import { initiateSignInSaga, initLogout } from "./authSagas";
import { initChatLoad } from "./chatSagas";

export default function* rootSaga() {
  yield all([initiateSignInSaga(), initLogout(), initChatLoad()]);
}
