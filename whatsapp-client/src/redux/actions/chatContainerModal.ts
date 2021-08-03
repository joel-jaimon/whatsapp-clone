import { chatContainerModalTypes } from "../types/chatContainerModal";

export const setChatContainerModal = (payload: any) => ({
    type: chatContainerModalTypes.SET_CHAT_CONTAINER_MODAL,
    payload,
});
