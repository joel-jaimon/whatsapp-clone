// Combine all reducers here
import { combineReducers } from "redux";
import dropDownReducer from "./reducers/dropDown";
import globalModalReducer from "./reducers/globalModal";
import { movableModalReducers } from "./reducers/movableModal";
import { sidebarChatModalReducers } from "./reducers/sidebarChatModal";
import { chatContainerModalReducers } from "./reducers/chatContainerModal";
import { chatReducer } from "./reducers/activeChat";
import { authReducer } from "./reducers/auth";
import { attachmentModalReducer } from "./reducers/attachmentModal";
import { roomModalReducer } from "./reducers/roomModal";

export default combineReducers({
    authState: authReducer,
    activeChat: chatReducer,
    roomModal: roomModalReducer,
    dropDownMenu: dropDownReducer,
    globalModal: globalModalReducer,
    movableModal: movableModalReducers,
    chatModal: chatContainerModalReducers,
    sidebarModal: sidebarChatModalReducers,
    attachmentModal: attachmentModalReducer,
});
