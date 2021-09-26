import s from "../attachmentModal.module.scss";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useRef } from "react";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { FilePreview } from "../AttachmentModal";
import {
  addAttachments,
  changeFileInPreview,
  removeAttachment,
  uploadAttachments,
} from "redux/reducers/attachmentModal";
import { parseAttachmentFiles } from "utils/parseAttachementFiles";

const passStateToProps = ({ attachmentModal, chatState, authState }: any) => ({
  attachmentModal: attachmentModal,
  activeChat: chatState.chat[chatState.activeChat],
  authState: authState.auth,
});

const passDispatchToProps = (dispatch: any) => ({
  addFile: (file: any) => dispatch(addAttachments(file)),
  removeFile: (fileIndex: number) => dispatch(removeAttachment(fileIndex)),
  changeFileInPreview: (fileIndex: number) =>
    dispatch(changeFileInPreview(fileIndex)),
  startUploadingAttachments: (payload: any) =>
    dispatch(uploadAttachments(payload)),
});

export const PreviewFooter = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    addFile,
    attachmentModal,
    removeFile,
    changeFileInPreview,
    startUploadingAttachments,
    closeAttachmentModal,
    activeChat,
    authState,
  }: any) => {
    const sliderRef: any = useRef(null);
    const mainRef: any = useRef(null);

    const handleLeft = () => {
      const px = (attachmentModal.fileInPreview - 1) * 64;
      sliderRef.current.scroll({
        left: px,
        behavior: "smooth",
      });
      changeFileInPreview((prev: number) => (prev === 0 ? 0 : prev - 1));
    };

    const handleRight = () => {
      changeFileInPreview((prev: number) => prev + 1);
      const px = (attachmentModal.fileInPreview + 1) * 64;
      sliderRef.current.scroll({
        left: px,
        behavior: "smooth",
      });
    };

    const handleKeyPress = (e: any) => {
      switch (e.keyCode) {
        case 37:
          handleLeft();
          break;
        case 39:
          handleRight();
          break;
      }
      return;
    };

    const scrollTo = (index: number) => {
      const px = index * 64;
      sliderRef.current.scroll({
        left: px,
        behavior: "smooth",
      });
      changeFileInPreview(index);
    };

    const handleFileAddition = async (e: any) => {
      if (e.target.files) {
        const files = await parseAttachmentFiles(e.target.files);
        addFile(files);
      }
    };

    const handleFileRemoval = (index: number) => {
      if (attachmentModal.files.length === 1) {
        closeAttachmentModal();
        return;
      }
      if (attachmentModal.files[index + 1]) {
        changeFileInPreview(index + 1);
      }
      removeFile(index);
    };

    const handleSendAttachment = () => {
      startUploadingAttachments({
        msgInfo: {
          type: activeChat.chatInfo.type,
          // msgType:"",
          refId: activeChat.chatInfo._id,
          timestamp: Date.now(),
          sentBy: authState.objectId,
        },
        files: attachmentModal.files,
        clientSide: activeChat.chatInfo?.clientSide,
      });
    };

    useEffect(() => {
      if (mainRef.current) mainRef.current.focus();
    }, []);

    return (
      <div className={s.previewFooter}>
        <button onClick={handleSendAttachment} className={s.button}>
          <SendIcon />
        </button>
        <div id="attachement-modal-footer" ref={sliderRef} className={s.footer}>
          {attachmentModal.files.map((e: any, i: number) => {
            return (
              <div
                key={i}
                className={
                  i === attachmentModal.fileInPreview
                    ? s.previewActive
                    : s.previewDefault
                }
              >
                <CloseIcon
                  className={s.close}
                  onClick={() => handleFileRemoval(i)}
                />
                <div className={s.overlay} onClick={() => scrollTo(i)} />

                <FilePreview file={e[0]} iconPreview={true} />
              </div>
            );
          })}
          <div className={s.addFileButton}>
            <input
              accept=".docx, .doc, .pdf, .zip, .rar, .mp4, .mp3, .png"
              multiple={false}
              onChange={handleFileAddition}
              type="file"
            />
            <p>
              <AddIcon />
            </p>
            <small>ADD FILE</small>
          </div>
        </div>
      </div>
    );
  }
);
