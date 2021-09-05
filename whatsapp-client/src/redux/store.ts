import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { combinedReducers } from "./rootReducer";

const middleware = [logger];

export const store = configureStore({
    reducer: combinedReducers,
    middleware,
});
