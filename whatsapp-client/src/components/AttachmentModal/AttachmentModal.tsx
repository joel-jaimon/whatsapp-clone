import s from "./attachmentModal.module.scss";
import CloseIcon from "@material-ui/icons/Close";
import { Image } from "./components/Image";
import { Video } from "./components/Video";
import { File } from "./components/File";
import { PreviewFooter } from "./components/PreviewFooter";
import { useState } from "react";
import { connect } from "react-redux";
import {
    changeFileInPreview,
    resetFileAttachmentModal,
} from "../../redux/actions/attachmentModal";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { BlendFromBottomAnimation } from "../../animations/BlendFromBottomAnimation";

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

const passStateToProps = ({ attachmentModal, activeChat }: any) => ({
    attachmentModalFor: attachmentModal.modalFor,
    fileInPreview: attachmentModal.files[attachmentModal.fileInPreview],
    activeChat: activeChat.chat,
});

const passDispatchToProps = (dispatch: any) => ({
    resetAttachmentModal: () => dispatch(resetFileAttachmentModal()),
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
                setReverseAttachmentModalAnimation(false);
                resetAttachmentModal();
            }
        };

        const closeAttachmentModal = () => {
            setReverseAttachmentModalAnimation(true);
        };

        return attachmentModalFor === activeChat.chatInfo.id ? (
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
                    <FilePreview file={fileInPreview} />
                    {!["image", "video"].includes(
                        fileInPreview?.type?.split("/")[0]
                    ) ? (
                        <small>{fileInPreview?.name}</small>
                    ) : null}
                </div>
                <PreviewFooter closeAttachmentModal={closeAttachmentModal} />
            </BlendFromBottomAnimation>
        ) : (
            <div />
        );
    }
);
