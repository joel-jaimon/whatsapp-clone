import s from "./attachmentModal.module.scss";
import CloseIcon from "@material-ui/icons/Close";
import { Image } from "./components/Image";
import { Video } from "./components/Video";
import { File } from "./components/File";
import { PreviewFooter } from "./components/PreviewFooter";
import { connect } from "react-redux";
import {
    changeFileInPreview,
    resetFileAttachmentModal,
    setAttachmentModal,
} from "../../redux/actions/attachmentModal";

export const FilePreview = ({ file }: any) => {
    if (!file) {
        return <div />;
    }
    const { type }: any = file;
    switch (type.split("/")[0]) {
        case "image":
            return <Image file={file} />;
        case "video":
            return <Video file={file} />;
        default:
            return <File file={file} />;
    }
};

const passStateToProps = ({ attachmentModal }: any) => ({
    attachmentModal: attachmentModal.modal,
    fileInPreview: attachmentModal.files[attachmentModal.fileInPreview],
});

const passDispatchToProps = (dispatch: any) => ({
    resetAttachmentModal: () => dispatch(resetFileAttachmentModal()),
    changeFileInPreview: (fileIndex: number) =>
        dispatch(changeFileInPreview(fileIndex)),
});

export const AttachmentModal = connect(
    passStateToProps,
    passDispatchToProps
)(({ attachmentModal, fileInPreview, resetAttachmentModal }: any) => {
    return attachmentModal ? (
        <div className={s.attachmentModal}>
            <header>
                <CloseIcon onClick={() => resetAttachmentModal()} />
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
            <PreviewFooter />
        </div>
    ) : (
        <div />
    );
});
