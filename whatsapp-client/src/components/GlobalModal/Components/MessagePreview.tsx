import s from "../globalModalStyles.module.scss";
import { useEffect, useRef, useState } from "react";

// Icons
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import StarIcon from "@material-ui/icons/Star";
import ReplyIcon from "@material-ui/icons/Reply";
import GetAppIcon from "@material-ui/icons/GetApp";
import CloseIcon from "@material-ui/icons/Close";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { MinimizedVideo } from "components/MovableModal/Components/MinimizedVideo";
import { connect } from "react-redux";
import {
  setGlobalModal,
  setGlobalMsgInFocus,
} from "redux/reducers/globalModal";

const mapStateToProps = ({ globalModal, chatState, authState }: any) => ({
  globalModal,
  activeChat: chatState.chat[chatState.activeChat],
  authusers: chatState.authUsers,
  authUserId: authState.auth.objectId,
});

const mapDispatchToProps = (dispatch: any) => ({
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
  setGlobalMsgInFocus: (params: any) => dispatch(setGlobalMsgInFocus(params)),
});

export const MessagePreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    globalModal: { modal, msgInFocus },
    activeChat,
    setGlobalModal,
    setGlobalMsgInFocus,
    authusers,
    authUserId,
  }: any) => {
    const [activeMsg, setActiveMsg] = useState(0);
    const sliderRef: any = useRef(null);
    const mainRef: any = useRef(null);

    const scrollTo = (
      index: number,
      msgId?: string,
      spawn: boolean = false
    ) => {
      const px = index * 64;
      sliderRef.current.scroll({
        left: px,
        behavior: spawn ? "auto" : "smooth",
      });
      setGlobalMsgInFocus(msgId);
    };

    const downloadedMedia = () => {
      return activeChat.messages?.filter(({ msgType }: any) => {
        return msgType === "image" || msgType === "video";
      });
    };

    const mediaInFocus = () => {
      return downloadedMedia()?.filter(({ _id }: any) => _id === msgInFocus)[0];
    };

    const totalAvailableMedia = downloadedMedia();
    const mediaInPreview = mediaInFocus();

    const handleLeft = () => {
      const px = (activeMsg - 1) * 64;
      sliderRef.current.scroll({
        left: px,
        behavior: "smooth",
      });
      setActiveMsg((prev) => prev - 1);
      setGlobalMsgInFocus(totalAvailableMedia[activeMsg - 1]._id);
    };

    const handleRight = () => {
      setActiveMsg((prev) => prev + 1);
      setGlobalMsgInFocus(totalAvailableMedia[activeMsg + 1]._id);
      const px = (activeMsg + 1) * 64;
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

    const first = totalAvailableMedia[0]?._id === msgInFocus;
    const last =
      totalAvailableMedia[totalAvailableMedia?.length - 1]?._id === msgInFocus;

    useEffect(() => {
      mainRef.current.focus();
    }, []);

    useEffect(() => {
      (async () => {
        const newIndex = totalAvailableMedia.findIndex((e: any) => {
          return e._id === msgInFocus;
        });
        setActiveMsg(newIndex);
        scrollTo(newIndex, msgInFocus, true);
      })();
    }, []);

    return (
      <div
        ref={mainRef}
        tabIndex={0}
        onKeyDown={handleKeyPress}
        className={s.msgFullPreview}
      >
        <div className={s.header}>
          <div className={s.info}>
            <img src={activeChat.chatInfo.avatar} alt="avatar" />
            <div>
              <strong>
                You @{" "}
                {activeChat.chatInfo.type === "group"
                  ? activeChat.chatInfo.name
                  : ""}
              </strong>
              <br />
              <small>today at 9:55 AM</small>
            </div>
          </div>
          <div className={s.control}>
            <ChatBubbleOutlineOutlinedIcon />
            <StarIcon />
            <ReplyIcon />
            <GetAppIcon />
            <CloseIcon onClick={() => setGlobalModal(null)} />
          </div>
        </div>
        <div className={s.main}>
          <button
            disabled={first}
            style={{
              backgroundColor: first ? "#26292b" : "#3b4042",
              cursor: first ? "default" : "pointer",
            }}
            onClick={handleLeft}
          >
            <ChevronLeftIcon />
          </button>
          <div className={s.preview}>
            {mediaInPreview?.msgType === "image" ? (
              <img src={mediaInPreview?.msgParams?.url} alt="msg preview" />
            ) : (
              <MinimizedVideo params={mediaInPreview?.msgParams} />
            )}
          </div>
          <button
            disabled={last}
            style={{
              backgroundColor: last ? "#26292b" : "#3b4042",
              cursor: last ? "default" : "pointer",
            }}
            onClick={handleRight}
          >
            <ChevronRightIcon />
          </button>
        </div>
        <div ref={sliderRef} className={s.footer}>
          {totalAvailableMedia.map((media: any, i: number) => {
            return (
              <div key={media._id} className={s.mediaPreview}>
                {media.msgType === "video" ? (
                  <video
                    draggable={false}
                    onClick={() => scrollTo(i, media._id)}
                    className={
                      media._id === msgInFocus
                        ? s.previewActive
                        : s.previewDefault
                    }
                    src={media.msgParams.url}
                  />
                ) : (
                  <img
                    onClick={() => scrollTo(i, media._id)}
                    draggable={false}
                    className={
                      media._id === msgInFocus
                        ? s.previewActive
                        : s.previewDefault
                    }
                    src={media.msgParams.url}
                    alt="smallPreview"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
