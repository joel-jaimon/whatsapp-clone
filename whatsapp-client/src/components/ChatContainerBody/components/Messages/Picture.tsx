import s from "./messages.module.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ForwardIcon from "@material-ui/icons/Forward";
import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import {
    setGlobalModal,
    setGlobalMsgInFocus,
} from "../../../../redux/reducers/globalModal";

const mapDispatchToProps = (dispatch: any) => ({
    setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
    setGlobalMsgInFocus: (id: string) => dispatch(setGlobalMsgInFocus(id)),
});

export const Picture = connect(
    null,
    mapDispatchToProps
)(
    ({
        id,
        msgPosition,
        msgParams,
        setGlobalModal,
        setGlobalMsgInFocus,
    }: any) => {
        const { thumbnail, url, size, orientation } = msgParams;
        const [loading, setLoading] = useState<boolean>(false);
        const [downloaded, setDownloaded] = useState<boolean>(false);

        const preview = () => {
            setGlobalModal({
                type: "viewMsgPreview",
                params: { messageType: "image" },
            });
            setGlobalMsgInFocus(id);
        };

        const downloadImg = () => {
            setLoading(true);
            setTimeout(() => {
                setDownloaded(true);
                setLoading(false);
            }, 3000);
        };

        const cancelDownload = () => {
            setLoading(false);
        };

        return (
            <span className={msgPosition === "right" ? s.imgRight : s.imgLeft}>
                <div className={s.img}>
                    <div
                        className={
                            orientation === "potrait"
                                ? s.imgPotrait
                                : s.imgLandscape
                        }
                    >
                        {!downloaded ? (
                            <div
                                onClick={loading ? cancelDownload : downloadImg}
                                className={s.downloadWrapper}
                            >
                                {loading ? (
                                    <button
                                        onClick={cancelDownload}
                                        className={s.loader}
                                    >
                                        <CloseIcon className={s.closeIcon} />
                                        <CircularProgress className={s.icon} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={downloadImg}
                                        className={s.download}
                                    >
                                        <ForwardIcon
                                            className={s.downloadIcon}
                                        />
                                        <small>{size}</small>
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div onClick={preview} className={s.smoke}>
                                <ExpandMoreIcon />
                            </div>
                        )}

                        <img
                            draggable={false}
                            className={downloaded ? s.releasedImg : s.thumbnail}
                            src={downloaded ? url : thumbnail}
                            alt="file-thumbnail"
                        />
                    </div>
                </div>
            </span>
        );
    }
);
