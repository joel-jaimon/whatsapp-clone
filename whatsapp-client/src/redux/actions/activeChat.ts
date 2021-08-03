import { activeChatTypes } from "../types/activeChatTypes";

export const setActiveChat = (payload: any) => ({
    type: activeChatTypes.SET_ACTIVE_CHAT,
    payload,
});
