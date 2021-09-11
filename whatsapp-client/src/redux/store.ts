import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { combinedReducers } from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import { refreshToken } from "../utils/refreshToken";
import { getAccessToken } from "../utils/accessToken";
import { setAuthFailed, setSocketConnectionSuccess } from "./reducers/auth";
import { getActiveSocket, initializeSocket } from "./sockets/socketConnection";
import { createSocketMiddleware } from "./middlewares/socketMiddleware";

const sagaMiddleware = createSagaMiddleware();
const socketMiddleware = createSocketMiddleware();
const middleware = [
  // logger,
  socketMiddleware,
  sagaMiddleware,
] as const;

const store = configureStore({
  reducer: combinedReducers,
  middleware,
});

// Re-Auth of returning user
(async () => {
  await refreshToken();
  const accessToken = getAccessToken();

  if (!accessToken) {
    store.dispatch(setAuthFailed(null));
    return;
  } else {
    await initializeSocket();
    const socket = getActiveSocket();
    if (socket) {
      store.dispatch(setSocketConnectionSuccess());
    }
    return;
  }
})();

sagaMiddleware.run(rootSaga);

export default store;
