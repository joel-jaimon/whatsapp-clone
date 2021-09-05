import { sidebarChatModalTypes } from "../types/sidebarModal";

export const setSidebarModal = (payload: any) => ({
    type: sidebarChatModalTypes.SET_SIDEBAR_CHAT_MODAL,
    payload,
});
