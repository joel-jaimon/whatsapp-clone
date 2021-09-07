import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { combinedReducers } from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
const sagaMiddleware = createSagaMiddleware();

const middleware = [logger, sagaMiddleware];

const store = configureStore({
  reducer: combinedReducers,
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
