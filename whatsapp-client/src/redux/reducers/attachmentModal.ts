import { attachmentModalTypes } from "../types/attachmentModal";

const initialState = {
    modal: null,
    files: [],
    fileInPreview: 0,
};

export const attachmentModalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case attachmentModalTypes.SET_ATTACHMENT_MODAL:
            return {
                ...state,
                modal: action.payload,
            };
        case attachmentModalTypes.ADD_FILE:
            return {
                ...state,
                files: [...state.files, ...action.payload],
            };
        case attachmentModalTypes.REMOVE_FILE:
            state.files.splice(action.payload, 1);
            return {
                ...state,
                files: state.files,
            };
        case attachmentModalTypes.CHANGE_IN_PREVIEW:
            return {
                ...state,
                fileInPreview: action.payload,
            };
        case attachmentModalTypes.RESET:
            return initialState;
        default:
            return state;
    }
};
