import { connect } from "react-redux";
import { getPreviewIcon } from "./getPreviewIcon";
import s from "./mediaSection.module.scss";

const passStateToProps = ({ chatModal, chatState, authState }: any) => ({
  activeChat: chatState.chat[chatState.activeChat],
});

export const MediaSection = connect(passStateToProps)(({ activeChat }: any) => {
  return (
    <div className={s.mediaScreen}>
      <div className={s.head}>
        <p className="chatModalSectionTitle">Media, Links and Docs</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 21"
          width="10"
          height="21"
        >
          <path
            fill="currentColor"
            d="M1 15.75l5.2-5.2L1 5.35l1.5-1.5 6.5 6.7-6.6 6.6-1.4-1.4z"
          ></path>
        </svg>
      </div>
      <div className={s.mediaThumbnails}>
        {Object.entries(activeChat?.messages)
          .filter((e: any) => e[1].msgType !== "text")
          .map((e: any) => {
            console.log(e[1]);
            return (
              <div className={s.media} key={e[0]}>
                <img
                  src={
                    e[1].msgType === "document"
                      ? getPreviewIcon(e[1].msgParams.fileName.split(".")[1])
                      : e[1].msgType === "image"
                      ? e[1].msgParams.url
                      : e[1].msgType === "video"
                      ? e[1].msgParams.thumbnail
                      : getPreviewIcon(e[1].msgType)
                  }
                  alt="*_*"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
});
