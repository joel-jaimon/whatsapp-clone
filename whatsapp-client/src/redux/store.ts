import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { combinedReducers } from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import { delaySidebarModal } from "./sagas/delaySidbaruserModal";

const sagaMiddleware = createSagaMiddleware();

const middleware = [logger, sagaMiddleware];

const store = configureStore({
  reducer: combinedReducers,
  middleware,
});

sagaMiddleware.run(delaySidebarModal);

export default store;
