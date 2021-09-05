import { dropDownSlice } from "./reducers/dropDown";
import { globalModalSlice } from "./reducers/globalModal";
import { movableModalSlice } from "./reducers/movableModal";
import { sidebarChatModalSlice } from "./reducers/sidebarChatModal";
import { chatContainerModalSlice } from "./reducers/chatContainerModal";
import chatSlice from "./reducers/activeChat";
import { authSlice } from "./reducers/auth";
import { attachmentModalSlice } from "./reducers/attachmentModal";
import { roomModalSlice } from "./reducers/roomModal";

export const combinedReducers = {
    authState: authSlice.reducer,
    activeChat: chatSlice.reducer,
    roomModal: roomModalSlice.reducer,
    dropDownMenu: dropDownSlice.reducer,
    globalModal: globalModalSlice.reducer,
    movableModal: movableModalSlice.reducer,
    chatModal: chatContainerModalSlice.reducer,
    sidebarModal: sidebarChatModalSlice.reducer,
    attachmentModal: attachmentModalSlice.reducer,
};
