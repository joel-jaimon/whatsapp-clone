import { AudioRecorder } from "../AudioRecorder/AudioRecorder";
import { useRef, useState } from "react";
import { Activity } from "../Activity/Activity";
import s from "./chatContainerFooterStyles.module.scss";
import SendIcon from "@material-ui/icons/Send";
import {
  AttachmentIcon,
  AvatarIcon,
  CameraIcon,
  CloseIcon,
  DocumentIcon,
  GifIcon,
  MicIcon,
  PictureIcon,
  SmileIcon,
  StickerIcon,
  VideoCallIcon,
} from "./icons/ChatFooterIcons";
import { ShowAttachmentAnimations } from "animations/chatFooterAnimation/ShowAttachmentAnimations";
import { ExpandOptions } from "animations/ExpandOptions";
import { RecorderAnimation } from "animations/chatFooterAnimation/RecorderAnimation";
import { v4 as uuidv4 } from "uuid";

import { connect } from "react-redux";
import {
  addAttachments,
  resetFileAttachmentModal,
  setAttachmentModal,
  uploadAttachments,
} from "redux/reducers/attachmentModal";
import { sendMsgStart } from "redux/reducers/chat";
import { parseAttachmentFiles } from "utils/parseAttachementFiles";
import { setGlobalModal } from "redux/reducers/globalModal";

const passStateFromProps = ({
  chatState,
  attachmentModal,
  authState,
}: any) => ({
  activeChat: chatState.chat[chatState.activeChat],
  attachmentModal,
  authUser: authState.auth,
});

const passDispatchToProps = (dispatch: any) => ({
  setAttachmentModal: (modal: any) => dispatch(setAttachmentModal(modal)),
  addAttachments: (files: any[]) => dispatch(addAttachments(files)),
  resetAttachmentModal: () => dispatch(resetFileAttachmentModal(null)),
  sendMessage: (payload: any) => dispatch(sendMsgStart(payload)),
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
  startUploadingAttachments: (payload: any) =>
    dispatch(uploadAttachments(payload)),
});

export const ChatContainerFooter = connect(
  passStateFromProps,
  passDispatchToProps
)(
  ({
    setAttachmentModal,
    addAttachments,
    activeChat,
    attachmentModal,
    resetAttachmentModal,
    authUser,
    sendMessage,
    setGlobalModal,
    startUploadingAttachments,
  }: any) => {
    const [height, setHeight] = useState(0);
    const [activity, setActivity] = useState<boolean | string>(false);
    const [recording, setRecording] = useState(false);
    const [attachmentMenu, setAttachmentMenu] = useState(false);
    const [reverseRecordingAnimation, setReverseRecording] = useState(false);
    const [reverseAnimationAttachmentMenu, setReverseAnimationAttachmentMenu] =
      useState(false);
    const [reverseActivityAnimation, setReverseActivityAnimation] =
      useState(false);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const closeAttachmentMenu = () => {
      if (reverseAnimationAttachmentMenu) {
        setReverseAnimationAttachmentMenu(false);
        setAttachmentMenu(false);
      }
    };

    const closeActivityContainer = () => {
      if (reverseActivityAnimation) {
        setReverseActivityAnimation(false);
        setActivity(false);
      }
    };

    const stopRecording = () => {
      if (reverseRecordingAnimation) {
        setReverseRecording(false);
        setRecording(false);
      }
    };

    const sendMsg = () => {
      // @ts-ignore
      const msg = inputRef.current.innerText.replaceAll("\n", "<br/>");
      sendMessage({
        tempId: uuidv4(),
        type: activeChat.chatInfo.type,
        msgType: "text",
        sentBy: authUser.objectId,
        msgParams: {
          text: msg,
        },
        refId: activeChat.chatInfo._id,
        timestamp: Date.now(),
        clientSide: activeChat.chatInfo.clientSide,
      });
      // @ts-ignore
      inputRef.current.innerText = "";
    };

    const handleAttachments = async (e: any) => {
      if (attachmentModal.files[0]) {
        resetAttachmentModal();
      }
      setReverseAnimationAttachmentMenu(true);
      const files = await parseAttachmentFiles(e.target.files);
      addAttachments(files);
      setAttachmentModal(activeChat?.chatInfo.id);
    };

    const sendClickedImage = async (e: Blob) => {
      closeAttachmentMenu();
      const file = new File([e], `${uuidv4().replaceAll("-", "")}.png`, {
        type: "image/png",
      });
      const parsedFile = await parseAttachmentFiles([file]);
      startUploadingAttachments({
        msgInfo: {
          type: activeChat.chatInfo.type,
          // msgType:"",
          refId: activeChat.chatInfo._id,
          timestamp: Date.now(),
          sentBy: authUser.objectId,
        },
        files: parsedFile,
        clientSide: activeChat.chatInfo?.clientSide,
      });
    };

    const takePhoto = () => {
      if (localStorage.getItem("_streamPermission")) {
        setGlobalModal({
          type: "takePhoto",
          params: {
            viaFooter: true,
            send: sendClickedImage,
          },
        });
      } else {
        setGlobalModal({
          type: "allowCamera",
          params: {},
        });
      }
    };

    const attachmentsArray = [
      <PictureIcon className={s.pictureIcon}>
        <input
          onChange={handleAttachments}
          multiple={true}
          type="file"
          accept="image/png"
        />
      </PictureIcon>,
      <CameraIcon onClick={takePhoto} className={s.cameraIcon} />,
      <DocumentIcon className={s.docIcon}>
        <input
          onChange={handleAttachments}
          type="file"
          multiple={false}
          accept=".docx, .doc, .pdf, .zip, .rar"
        />
      </DocumentIcon>,
      <AvatarIcon className={s.avatarIcon} />,
      <VideoCallIcon className={s.videoIcon}>
        <input
          onChange={handleAttachments}
          type="file"
          multiple={false}
          accept="video/mp4"
        />
      </VideoCallIcon>,
    ];

    return (
      <>
        {activity ? (
          <Activity
            ref={inputRef}
            typing={typing}
            setTyping={setTyping}
            setInput={setInput}
            onClose={closeActivityContainer}
            reverseActivityAnimation={reverseActivityAnimation}
          />
        ) : null}
        <div
          style={{
            height: height === 0 ? 45 : 29 + height,
          }}
          className={s.footer}
        >
          <div className={s.footerControls}>
            {activity ? (
              <ExpandOptions reverse={reverseActivityAnimation}>
                <CloseIcon
                  onClick={() => setReverseActivityAnimation(true)}
                  className="icons"
                />
              </ExpandOptions>
            ) : null}
            <SmileIcon
              onClick={() => setActivity("emojiDrawer")}
              className={`icons ${
                activity === "emojiDrawer" ? "active-icon" : ""
              }`}
            />

            {activity ? (
              <ExpandOptions reverse={reverseActivityAnimation}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <GifIcon
                    onClick={() => setActivity("gifDrawer")}
                    className={`icons ${
                      activity === "gifDrawer" ? "active-icon" : ""
                    }`}
                  />
                  <StickerIcon
                    onClick={() => setActivity("stickerDrawer")}
                    className={`icons ${
                      activity === "stickerDrawer" ? "active-icon" : ""
                    }`}
                  />
                </div>
              </ExpandOptions>
            ) : null}

            <div className={s.attachmentButton}>
              {attachmentMenu ? (
                <ShowAttachmentAnimations
                  items={attachmentsArray}
                  className={s.attachments}
                  reverse={reverseAnimationAttachmentMenu}
                  onClose={closeAttachmentMenu}
                />
              ) : null}
              <AttachmentIcon
                onClick={() => {
                  if (attachmentMenu) {
                    setReverseAnimationAttachmentMenu(true);
                  } else {
                    setAttachmentMenu(true);
                  }
                }}
                className="icons"
              />
            </div>
          </div>
          <div
            style={{
              height: height === 0 ? 30 : 14 + height,
            }}
            className={s.input}
          >
            {typing ? null : (
              <span className={s.spanPlaceholder}>Type a message</span>
            )}
            <div className={s.spanInput}>
              <span
                ref={inputRef}
                contentEditable="true"
                data-tab="6"
                id="custom-input"
                onDrop={(e) => e.preventDefault()}
                onPaste={(e: any) => {
                  e.preventDefault();
                  // [Incomplete]
                  // setInput(e?.clipboardData?.getData("Text"));
                  // if (!(height === e.target?.offsetHeight)) {
                  //     //@ts-ignore
                  //     setHeight(e.target?.offsetHeight);
                  // }
                }}
                onInput={(e: any) => {
                  if (e.target.innerText.length > 0) {
                    setTyping(true);
                  } else {
                    setTyping(false);
                  }
                  //@ts-ignore
                  if (!(height === e.target?.offsetHeight)) {
                    //@ts-ignore
                    setHeight(e.target?.offsetHeight);
                  }
                }}
                dir="ltr"
                spellCheck="true"
                dangerouslySetInnerHTML={{ __html: input }}
              />
            </div>
          </div>
          {typing ? (
            <div className={`icons ${s.sendButton}`}>
              <SendIcon onClick={sendMsg} />
            </div>
          ) : recording ? (
            <RecorderAnimation
              onClose={stopRecording}
              reverse={reverseRecordingAnimation}
            >
              <AudioRecorder closeOption={setReverseRecording} />
            </RecorderAnimation>
          ) : (
            <div className={s.recorder}>
              <MicIcon onClick={() => setRecording(true)} className="icons" />
            </div>
          )}
        </div>
      </>
    );
  }
);
