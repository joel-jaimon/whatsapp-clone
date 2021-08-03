// Combine all reducers here
import { combineReducers } from "redux";
import { chatContainerModalReducers } from "./reducers/chatContainerModal";
import globalModalReducer from "./reducers/globalModal";
import dropDownReducer from "./reducers/dropDown";
import { movableModalReducers } from "./reducers/movableModal";
import { sidebarChatModalReducers } from "./reducers/sidebarChatModal";

export default combineReducers({
    chatModal: chatContainerModalReducers,
    globalModal: globalModalReducer,
    dropDownMenu: dropDownReducer,
    movableModal: movableModalReducers,
    sidebarModal: sidebarChatModalReducers,
});
