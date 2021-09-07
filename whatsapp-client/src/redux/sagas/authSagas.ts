import dummyAuth from "../../data/temp/auth.json";
import guestAvatars from "../../data/guestAvatars.json";
import { takeLatest, call, put } from "@redux-saga/core/effects";
import { initiateSignin, setAuthSuccess } from "../reducers/auth";
import { mockAPI } from "../../utils/mockAPI";
import { v4 as uuidv4 } from "uuid";

const googleSignin = async () => {
  return await mockAPI(true, 2000, dummyAuth);
};

function* googleSignIn(payload?: any) {
  //@ts-ignore
  const userData = yield call(googleSignin);
  yield put(setAuthSuccess({ ...payload, ...userData }));
}

function* guestSignIn(payload?: any) {
  const guestUserData = {
    ...payload,
    uid: uuidv4(),
    displayName: `guest-${Math.floor(Math.random() * 10000)}`,
    email: "guest@wibein-clone.com",
    avatar: guestAvatars[Math.floor(Math.random() * guestAvatars.length)],
    about: "Hey I am a guest user.",
  };

  yield put(setAuthSuccess(guestUserData));
}

export function* initiateSignInSaga() {
  yield takeLatest(initiateSignin.type, function* (action: any) {
    if (action.payload.authType === "guest") {
      yield guestSignIn(action.payload);
    } else {
      yield googleSignIn(action.payload);
    }
  });
}
