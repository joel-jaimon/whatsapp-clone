import { useContext } from "react";
import { dropDownContext } from "../../context/dropDownContext";
import s from "./chatContainerBodyStyles.module.scss";
import { File } from "./components/Messages/File";
import { Picture } from "./components/Messages/Picture";
import { Text } from "./components/Messages/Text";
import { Video } from "./components/Messages/Video";
import { Voice } from "./components/Messages/Voice";
import dummyChat from "../../data/chats/alexa.json";

const Message = ({ data, owner }: any) => {
    const _classname = owner ? s.RightWrap : s.LeftWrap;
    const _side = owner ? "right" : "left";
    switch (data.msgType) {
        case "text":
            return (
                <div className={_classname}>
                    <Text msgPosition={_side} {...data} />
                </div>
            );
        case "video":
            return (
                <div className={_classname}>
                    <Video msgPosition={_side} {...data} />
                </div>
            );
        case "voice":
            return (
                <div className={_classname}>
                    <Voice msgPosition={_side} {...data} />
                </div>
            );
        case "document":
            return (
                <div className={_classname}>
                    <File msgPosition={_side} {...data} />
                </div>
            );
        case "image":
            return (
                <div className={_classname}>
                    <Picture msgPosition={_side} {...data} />
                </div>
            );
    }
    return <div />;
};

export const ChatContainerBody = () => {
    const { dropMenu, setDropMenu } = useContext(dropDownContext);
    const me = "kasjhdk-askjdh-asdhkaw2sjd";

    return (
        <div
            onClickCapture={() => setDropMenu(false)}
            onContextMenu={(e) => {
                e.preventDefault();
                setDropMenu({
                    type: "activeChatInfo",
                    position: {
                        x: e.clientX,
                        y: e.clientY,
                    },
                    params: {},
                });
            }}
            className={s.chatContainerBody}
        >
            {dummyChat.map((chatData: any) => {
                const owner = chatData.user === me;
                return <Message owner={owner} data={chatData} />;
            })}
        </div>
    );
};
