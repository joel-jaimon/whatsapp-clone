// Combine all reducers here
import { combineReducers } from "redux";
import dropDownReducer from "./reducers/dropDown";

import globalModalReducer from "./reducers/globalModal";
import { movableModalReducers } from "./reducers/movableModal";

export default combineReducers({
    globalModal: globalModalReducer,
    dropDownMenu: dropDownReducer,
    movableModal: movableModalReducers,
});
