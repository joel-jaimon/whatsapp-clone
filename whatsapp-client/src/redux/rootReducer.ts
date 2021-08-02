// Combine all reducers here
import { combineReducers } from "redux";

import globalModalReducer from "./reducers/globalModal";

export default combineReducers({
    globalModal: globalModalReducer,
});
