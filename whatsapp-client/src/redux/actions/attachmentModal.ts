import { attachmentModalTypes } from "../types/attachmentModal";

export const setAttachmentModal = (payload: any) => ({
    type: attachmentModalTypes.SET_ATTACHMENT_MODAL,
    payload,
});
