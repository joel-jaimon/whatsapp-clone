import s from "./attachmentModal.module.scss";
import CloseIcon from "@material-ui/icons/Close";
import { Image } from "./components/Image";
import { Video } from "./components/Video";
import { File } from "./components/File";
import { PreviewFooter } from "./components/PreviewFooter";
import { useState } from "react";
import { connect } from "react-redux";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { BlendFromBottomAnimation } from "animations/BlendFromBottomAnimation";
import {
  changeFileInPreview,
  resetFileAttachmentModal,
} from "redux/reducers/attachmentModal";

export const FilePreview = ({ file, iconPreview }: any) => {
  if (!file) {
    return <div />;
  }
  const { type }: any = file;

  switch (type.split("/")[0]) {
    case "image":
      return <Image file={file} />;
    case "video":
      return iconPreview ? (
        <Video file={file} />
      ) : (
        <div className={s.videoPlayerWrapper}>
          <VideoPlayer src={URL.createObjectURL(file)} />
        </div>
      );
    default:
      return <File file={file} />;
  }
};

const passStateToProps = ({ attachmentModal, chatState }: any) => ({
  attachmentModalFor: attachmentModal.modalFor,
  fileInPreview: attachmentModal.files[attachmentModal.fileInPreview],
  activeChat: chatState.chat[chatState.activeChat],
});

const passDispatchToProps = (dispatch: any) => ({
  resetAttachmentModal: () => dispatch(resetFileAttachmentModal(null)),
  changeFileInPreview: (fileIndex: number) =>
    dispatch(changeFileInPreview(fileIndex)),
});

export const AttachmentModal = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    attachmentModalFor,
    fileInPreview,
    resetAttachmentModal,
    activeChat,
  }: any) => {
    const [
      reverseAttachmentModalAnimation,
      setReverseAttachmentModalAnimation,
    ] = useState(false);

    const onClose = () => {
      if (reverseAttachmentModalAnimation) {
        resetAttachmentModal();
        setReverseAttachmentModalAnimation(false);
      }
    };

    const closeAttachmentModal = () => {
      setReverseAttachmentModalAnimation(true);
    };

    return attachmentModalFor === activeChat?.chatInfo?.id ? (
      <BlendFromBottomAnimation
        onClose={onClose}
        reverse={reverseAttachmentModalAnimation}
        className={s.attachmentModal}
      >
        <header>
          <CloseIcon onClick={closeAttachmentModal} />
          <strong>Preview</strong>
        </header>
        <div className={s.previewInFocus}>
          <FilePreview file={fileInPreview[0]} />
          {!["image", "video"].includes(
            fileInPreview[0]?.type?.split("/")[0]
          ) ? (
            <small>{fileInPreview[0]?.name}</small>
          ) : null}
        </div>
        <PreviewFooter closeAttachmentModal={closeAttachmentModal} />
      </BlendFromBottomAnimation>
    ) : (
      <div />
    );
  }
);
