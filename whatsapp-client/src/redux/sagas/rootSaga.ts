import { all } from "@redux-saga/core/effects";
import { initiateSignInSaga, initLogout } from "./authSagas";

export default function* rootSaga() {
  yield all([initiateSignInSaga(), initLogout()]);
}
