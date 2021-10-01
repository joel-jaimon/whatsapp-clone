import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { combinedReducers } from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import { refreshToken } from "utils/refreshToken";
import { getAccessToken } from "utils/accessToken";
import { setAuthFailed, setSocketConnectionSuccess } from "./reducers/auth";
import { SocketIO } from "utils/socket";
import axios, { AxiosRequestConfig } from "axios";

export const globalAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

globalAxios.interceptors.request.use(
  async (request: AxiosRequestConfig<any>) => {
    request.headers!.Authorization = `Bearer ${getAccessToken()}`;
    return request;
  },
  (error) => {
    console.log(error);
  }
);

globalAxios.interceptors.response.use(
  async (response: AxiosRequestConfig<any>) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    console.log(error);
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        await refreshToken();
        //@ts-ignore
        globalAxios.defaults.headers!.common.Authorization = `Bearer ${getAccessToken()}`;
        return globalAxios(originalConfig);
      } catch (_error) {
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }

        return Promise.reject(_error);
      }
    }

    if (error.response.status === 403 && error.response.data) {
      return Promise.reject(error.response.data);
    }
  }
);

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
