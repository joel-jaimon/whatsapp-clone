import { attachmentModalTypes } from "../types/attachmentModal";

export const setAttachmentModal = (payload: any) => ({
    type: attachmentModalTypes.SET_ATTACHMENT_MODAL,
    payload,
});

export const addAttachments = (payload: any) => ({
    type: attachmentModalTypes.ADD_FILE,
    payload,
});

export const removeAttachment = (payload: any) => ({
    type: attachmentModalTypes.REMOVE_FILE,
    payload,
});

export const changeFileInPreview = (payload: any) => ({
    type: attachmentModalTypes.CHANGE_IN_PREVIEW,
    payload,
});

export const resetFileAttachmentModal = () => ({
    type: attachmentModalTypes.RESET,
});
