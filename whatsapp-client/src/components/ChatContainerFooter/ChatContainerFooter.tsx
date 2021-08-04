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

export const ChatContainerFooter = () => {
    const [height, setHeight] = useState(0);
    const [activity, setActivity] = useState<boolean | string>(false);
    const [recording, setRecording] = useState(false);
    const [recordTime, setRecordTime] = useState(0);
    const [attachmentMenu, setAttachmentMenu] = useState(false);
    const [typing, setTyping] = useState(false);
    const inputRef = useRef(null);

    const sendMsg = () => {
        // @ts-ignore
        const msg = inputRef.current.innerText.replaceAll("\n", "<br/>");
        console.log(msg);
    };

    return (
        <>
            {activity ? <Activity ref={inputRef} /> : null}
            <div
                style={{
                    height: height === 0 ? 45 : 29 + height,
                }}
                className={s.footer}
            >
                <div className={s.footerControls}>
                    {activity ? (
                        <CloseIcon
                            onClick={() => setActivity(false)}
                            className="icons"
                        />
                    ) : null}
                    <SmileIcon
                        onClick={() => setActivity("emojiDrawer")}
                        className={`icons ${
                            activity === "emojiDrawer" ? "active-icon" : ""
                        }`}
                    />

                    {activity ? (
                        <>
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
                        </>
                    ) : null}

                    <div className={s.attachmentButton}>
                        {attachmentMenu ? (
                            <div className={s.attachments}>
                                <VideoCallIcon />
                                <AvatarIcon />
                                <DocumentIcon>
                                    <input
                                        type="file"
                                        accept=".docx, .doc, .pdf"
                                    />
                                </DocumentIcon>
                                <CameraIcon />
                                <PictureIcon>
                                    <input type="file" accept="image/png" />
                                </PictureIcon>
                            </div>
                        ) : null}
                        <AttachmentIcon
                            onClick={() => setAttachmentMenu(!attachmentMenu)}
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
                        ></span>
                    </div>
                </div>
                {typing ? (
                    <div className={`icons ${s.sendButton}`}>
                        <SendIcon onClick={sendMsg} />
                    </div>
                ) : recording ? (
                    <AudioRecorder setRecording={setRecording} />
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
