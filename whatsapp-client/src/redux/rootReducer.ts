import { dropDownSlice } from "./reducers/dropDown";
import { globalModalSlice } from "./reducers/globalModal";
import { movableModalSlice } from "./reducers/movableModal";
import { sidebarChatModalSlice } from "./reducers/sidebarChatModal";
import { chatContainerModalSlice } from "./reducers/chatContainerModal";
import chatSlice from "./reducers/chat";
import { authSlice } from "./reducers/auth";
import { attachmentModalSlice } from "./reducers/attachmentModal";
import { roomModalSlice } from "./reducers/roomModal";
import { callerInfoSlice } from "./reducers/callerInfo";

export const combinedReducers = {
  authState: authSlice.reducer,
  chatState: chatSlice.reducer,
  roomState: callerInfoSlice.reducer,
  roomModal: roomModalSlice.reducer,
  dropDownMenu: dropDownSlice.reducer,
  globalModal: globalModalSlice.reducer,
  movableModal: movableModalSlice.reducer,
  chatModal: chatContainerModalSlice.reducer,
  sidebarModal: sidebarChatModalSlice.reducer,
  attachmentModal: attachmentModalSlice.reducer,
};
