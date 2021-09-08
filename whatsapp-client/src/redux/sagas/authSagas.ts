import dummyAuth from "../../data/temp/auth.json";
import guestAvatars from "../../data/guestAvatars.json";
import { takeLatest, call, put } from "@redux-saga/core/effects";
import { initiateSignin, setAuthSuccess } from "../reducers/auth";
import { v4 as uuidv4 } from "uuid";
import socket from "../../utils/socketConnection/socketConnection";

const googleSignin = async (payload: any) => {
  const data = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/g-auth/authenticate`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: payload.idToken,
      }),
    }
  );
  const response = await data.json();
  return response;
};

function* googleSignIn(payload?: any) {
  //@ts-ignore
  const userData = yield call(googleSignin, payload);
  yield put(setAuthSuccess({ ...payload, ...userData }));
}

const handleSignIn = async (data: any) => {
  return await socket.emit("guestSignIn", data);
};

function* guestSignIn(payload?: any) {
  const guestUserData = {
    ...payload,
    uid: uuidv4(),
    displayName: `guest-${Math.floor(Math.random() * 10000)}`,
    email: "guest@wibein-clone.com",
    avatar: guestAvatars[Math.floor(Math.random() * guestAvatars.length)],
    about: "Hey I am a guest user.",
  };
  yield call(handleSignIn, guestUserData);
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
