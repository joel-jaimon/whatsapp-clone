import { AudioRecorder } from "../AudioRecorder/AudioRecorder";
import { useEffect, useRef, useState } from "react";
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
import { ShowAttachmentAnimations } from "../../animations/chatFooterAnimation/ShowAttachmentAnimations";
import { ExpandOptions } from "../../animations/chatFooterAnimation/ExpandOptions";
import { RecorderAnimation } from "../../animations/chatFooterAnimation/RecorderAnimation";

export const ChatContainerFooter = () => {
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

    const attachmentsArray = [
        <VideoCallIcon className={s.videoIcon} />,
        <AvatarIcon className={s.avatarIcon} />,
        <DocumentIcon className={s.docIcon}>
            <input type="file" accept=".docx, .doc, .pdf" />
        </DocumentIcon>,
        <CameraIcon className={s.cameraIcon} />,
        <PictureIcon className={s.pictureIcon}>
            <input type="file" accept="image/png" />
        </PictureIcon>,
    ];

    const sendMsg = () => {
        // @ts-ignore
        const msg = inputRef.current.innerText.replaceAll("\n", "<br/>");
        console.log(msg);
    };

    return (
        <>
            {activity ? (
                <Activity
                    ref={inputRef}
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
                                onClick={() =>
                                    setReverseActivityAnimation(true)
                                }
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
                            <GifIcon
                                onClick={() => setActivity("gifDrawer")}
                                className={`icons ${
                                    activity === "gifDrawer"
                                        ? "active-icon"
                                        : ""
                                }`}
                            />
                            <StickerIcon
                                onClick={() => setActivity("stickerDrawer")}
                                className={`icons ${
                                    activity === "stickerDrawer"
                                        ? "active-icon"
                                        : ""
                                }`}
                            />
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
                        <span className={s.spanPlaceholder}>
                            Type a message
                        </span>
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
                        <MicIcon
                            onClick={() => setRecording(true)}
                            className="icons"
                        />
                    </div>
                )}
            </div>
        </>
    );
};
