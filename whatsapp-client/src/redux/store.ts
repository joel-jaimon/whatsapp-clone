import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

// import main reducer
import rootReducer from "./rootReducer";

// all of the middlewares to be used
const middlewares = [logger];

// main store
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
