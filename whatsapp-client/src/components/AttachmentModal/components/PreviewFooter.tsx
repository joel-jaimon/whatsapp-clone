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
} from "../../../redux/reducers/attachmentModal";

const passStateToProps = ({ attachmentModal }: any) => ({
    attachmentModal: attachmentModal,
});

const passDispatchToProps = (dispatch: any) => ({
    addFile: (file: any) => dispatch(addAttachments(file)),
    removeFile: (fileIndex: number) => dispatch(removeAttachment(fileIndex)),
    changeFileInPreview: (fileIndex: number) =>
        dispatch(changeFileInPreview(fileIndex)),
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
        closeAttachmentModal,
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

        const handleFileAddition = (e: any) => {
            if (e.target.files) addFile(e.target.files);
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

        useEffect(() => {
            if (mainRef.current) mainRef.current.focus();
        }, []);

        return (
            <div className={s.previewFooter}>
                <button className={s.button}>
                    <SendIcon />
                </button>
                <div
                    id="attachement-modal-footer"
                    ref={sliderRef}
                    className={s.footer}
                >
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
                                <div
                                    className={s.overlay}
                                    onClick={() => scrollTo(i)}
                                />

                                <FilePreview file={e} iconPreview={true} />
                            </div>
                        );
                    })}
                    <div className={s.addFileButton}>
                        <input
                            multiple={true}
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
