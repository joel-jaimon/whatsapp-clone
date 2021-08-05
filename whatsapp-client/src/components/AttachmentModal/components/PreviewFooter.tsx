import s from "../attachmentModal.module.scss";
import SendIcon from "@material-ui/icons/Send";

export const PreviewFooter = () => {
    return (
        <div className={s.previewFooter}>
            <button className={s.button}>
                <SendIcon />
            </button>
        </div>
    );
};
