import s from "./attachmentModal.module.scss";
import CloseIcon from "@material-ui/icons/Close";
import { Image } from "./components/Image";
import { Audio } from "./components/Audio";
import { Video } from "./components/Video";
import { File } from "./components/File";
import { PreviewFooter } from "./components/PreviewFooter";

const FilePreview = ({ type }: any) => {
    switch (type) {
        case "image":
            return <Image />;
        case "audio":
            return <Audio />;
        case "video":
            return <Video />;
        default:
            return <File />;
    }
};

export const AttachmentModal = () => {
    return (
        <div className={s.attachmentModal}>
            <header>
                <CloseIcon />
                <strong>Preview</strong>
            </header>
            <div className={s.previewInFocus}>
                <FilePreview />
            </div>
            <PreviewFooter />
        </div>
    );
};
