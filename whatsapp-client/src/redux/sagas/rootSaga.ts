import { all } from "@redux-saga/core/effects";
import { initiateSignInSaga } from "./authSagas";

export default function* rootSaga() {
  yield all([initiateSignInSaga()]);
}
