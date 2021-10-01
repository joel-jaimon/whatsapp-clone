import guestAvatars from "data/guestAvatars.json";
import { takeLatest, call, put } from "@redux-saga/core/effects";
import {
  authuserInfoUpdateSuccessfull,
  initAuthuserInfoUpdate,
  initiateLogout,
  initiateSignin,
  logout,
  setAuthSuccess,
  setSocketConnectionSuccess,
} from "redux/reducers/auth";
import { v4 as uuidv4 } from "uuid";
import { getAccessToken, setAccessToken } from "utils/accessToken";
import { SocketIO } from "utils/socket";
import { getActiveSocket } from "config/globalSocket";
import { globalAxios } from "config/globalAxios";

// Google SignIn -------------------------------------------
const googleSignin = async (payload: { idToken: string }) => {
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
  yield setAccessToken(userData.accessToken);
  const initializedSocket = new SocketIO(
    process.env.REACT_APP_SERVER_URL as string,
    getAccessToken()
  );
  yield call(initializedSocket.getActiveSocket);
  //@ts-ignore
  const socket = getActiveSocket();
  if (socket) {
    yield put(setSocketConnectionSuccess());
  }
}

// Guest SignIn ---------------------------------------------------
const handleGuestSignIn = async () => {
  // return await initializeSocket();
  return;
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
  yield call(handleGuestSignIn);
  yield put(setAuthSuccess(guestUserData));
}

// Signin Saga
export function* initiateSignInSaga() {
  yield takeLatest(initiateSignin.type, function* (action: any) {
    if (action.payload.authType === "guest") {
      yield guestSignIn(action.payload);
    } else {
      yield googleSignIn(action.payload);
    }
  });
}

// Logout Saga
const logoutUser = async () => {
  const { status } = await globalAxios({
    method: "GET",
    url: `/logout`,
    withCredentials: true,
  });
  // const data = await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
  //   method: "GET",
  //   credentials: "include",
  //   headers: {
  //     authorization: `Bearer ${getAccessToken()}`,
  //   },
  // });
  return status;
};

export function* initLogout() {
  yield takeLatest(initiateLogout.type, function* () {
    //@ts-ignore
    const status = yield call(logoutUser);
    if (status === 200) {
      yield put(logout());
    }
  });
}

export function* initAuthuserInfoUpdateSaga() {
  yield takeLatest(initAuthuserInfoUpdate.type, function* (action: any) {
    const socket = getActiveSocket();
    yield socket.emit("updateUserProfile", action.payload);
    yield put(authuserInfoUpdateSuccessfull(action.payload));
  });
}
