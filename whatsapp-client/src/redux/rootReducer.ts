// Combine all reducers here
import { combineReducers } from "redux";
import dropDownReducer from "./reducers/dropDown";

import globalModalReducer from "./reducers/globalModal";

export default combineReducers({
    globalModal: globalModalReducer,
    dropDownMenu: dropDownReducer,
});
