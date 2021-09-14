import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  modalFor: null,
  files: [],
  fileInPreview: 0,
};

export const attachmentModalSlice = createSlice({
  name: "attachmentModalReducer",
  initialState,
  reducers: {
    setAttachmentModal: (state, action) => {
      state.modalFor = action.payload;
    },

    addAttachments: (state, action) => {
      state.files.push(...action.payload);
    },

    uploadAttachments: (state, action) => {},

    uploadAttachmentsSuccessful: (state, action) => {},

    uploadAttachmentsFailed: (state, action) => {},

    removeAttachment: (state, action) => {
      state.files.splice(action.payload, 1);
    },

    changeFileInPreview: (state, action) => {
      state.fileInPreview = action.payload;
    },

    resetFileAttachmentModal: (state, action) => {
      state.modalFor = null;
      state.files = [];
      state.fileInPreview = 0;
    },
  },
});

export const {
  addAttachments,
  changeFileInPreview,
  removeAttachment,
  resetFileAttachmentModal,
  setAttachmentModal,
  uploadAttachments,
  uploadAttachmentsFailed,
  uploadAttachmentsSuccessful,
} = attachmentModalSlice.actions;
