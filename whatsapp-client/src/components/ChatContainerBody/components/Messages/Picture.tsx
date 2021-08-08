import s from "./messages.module.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ForwardIcon from "@material-ui/icons/Forward";
import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import {
    setGlobalModal,
    setGlobalMsgInFocus,
} from "../../../../redux/actions/setGlobalModal";
import { connect } from "react-redux";

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
        const { thumbnail, url, size } = msgParams;
        const [imageOrientation, setImageOrientation] = useState<any>(null);
        const [loading, setLoading] = useState<boolean>(false);
        const [downloaded, setDownloaded] = useState<boolean>(false);

        const handleImageType = (e: any) => {
            if (e.target.naturalHeight > e.target.naturalWidth) {
                setImageOrientation("potrait");
            } else {
                setImageOrientation("landscape");
            }
        };

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
                            imageOrientation === "potrait"
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
                            onLoad={handleImageType}
                        />
                    </div>
                </div>
            </span>
        );
    }
);
