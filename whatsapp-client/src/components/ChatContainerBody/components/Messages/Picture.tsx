import s from "./messages.module.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ForwardIcon from "@material-ui/icons/Forward";
import { useEffect, useRef, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import {
  setGlobalModal,
  setGlobalMsgInFocus,
} from "redux/reducers/globalModal";
import { formatTime } from "utils/formatTime";
import { SeenStats } from "components/SeenStats/SeenStats";

const mapDispatchToProps = (dispatch: any) => ({
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
  setGlobalMsgInFocus: (id: string) => dispatch(setGlobalMsgInFocus(id)),
});

export const Picture = connect(
  null,
  mapDispatchToProps
)(
  ({
    _id,
    msgPosition,
    msgParams,
    setGlobalModal,
    setGlobalMsgInFocus,
    stillSending,
    timestamp,
    extraParam,
  }: any) => {
    const { thumbnail, url, size, orientation } = msgParams;
    const [loading, setLoading] = useState<boolean>(true);
    const [downloaded, setDownloaded] = useState<boolean | string>(false);
    const imgRef: any = useRef();

    // Handle downloaded media dynamically
    useEffect(() => {
      if (!stillSending) {
        let img = new Image();
        img.src = url;
        setTimeout(() => {
          const complete = img.complete;
          console.log(complete);
          img.src = "";
          if (complete) {
            imgRef.current.src = url;
            setDownloaded(true);
          }
          setLoading(false);
          // 50ms is more than enough to check if img is cached
        }, 50);
      }
    }, []);

    // This runs when image was sent successfully to other user
    // loads new url, caches it.
    useEffect(() => {
      if (stillSending === false) {
        downloadImg();
      }
    }, [stillSending]);

    const preview = () => {
      setGlobalModal({
        type: "viewMsgPreview",
        params: { messageType: "image" },
      });
      setGlobalMsgInFocus(_id);
    };

    const downloadImg = () => {
      setLoading(true);
      const img = new Image();
      img.onload = () => {
        imgRef.current.src = img.src;
        setDownloaded(true);
        setLoading(false);
      };
      img.src = url;
    };

    const cancelDownload = () => {
      setLoading(false);
    };

    return (
      <span className={msgPosition === "right" ? s.imgRight : s.imgLeft}>
        <div className={s.img}>
          <div
            className={
              orientation === "potrait" ? s.imgPotrait : s.imgLandscape
            }
          >
            {!downloaded ? (
              <div
                onClick={loading ? cancelDownload : downloadImg}
                className={s.downloadWrapper}
              >
                {loading ? (
                  <button onClick={cancelDownload} className={s.loader}>
                    <CloseIcon className={s.closeIcon} />
                    <CircularProgress className={s.icon} />
                  </button>
                ) : (
                  <button onClick={downloadImg} className={s.download}>
                    <ForwardIcon className={s.downloadIcon} />
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
              ref={imgRef}
              draggable={false}
              className={downloaded ? s.releasedImg : s.thumbnail}
              src={thumbnail}
              alt="file-thumbnail"
            />
            <div className={s._A}>
              <small style={{ marginRight: extraParam.owner ? 0 : 5 }}>
                {formatTime(timestamp)}
              </small>
              {extraParam.owner ? (
                <SeenStats type={stillSending ? -1 : extraParam.seenStatus} />
              ) : null}
            </div>
          </div>
        </div>
      </span>
    );
  }
);
