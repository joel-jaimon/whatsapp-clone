import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { combinedReducers } from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import { refreshToken } from "utils/refreshToken";
import { getAccessToken } from "utils/accessToken";
import { setAuthFailed, setSocketConnectionSuccess } from "./reducers/auth";
import { SocketIO } from "utils/socket";

const sagaMiddleware = createSagaMiddleware();
const middleware = [logger, sagaMiddleware] as const;

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
    const initializedSocket = new SocketIO(
      process.env.REACT_APP_SERVER_URL as string,
      getAccessToken()
    );
    const socket = await initializedSocket.getActiveSocket();
    if (socket.connected) {
      store.dispatch(setSocketConnectionSuccess());
    }
    return;
  }
})();

sagaMiddleware.run(rootSaga);

export default store;
