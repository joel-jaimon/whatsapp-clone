import s from "./chatContainerBodyStyles.module.scss";
import { File } from "./components/Messages/File";
import { Picture } from "./components/Messages/Picture";
import { Text } from "./components/Messages/Text";
import { Video } from "./components/Messages/Video";
import { Voice } from "./components/Messages/Voice";
import { connect } from "react-redux";
import { setDropDown } from "../../redux/actions/setDropDown";
import { useEffect, useRef } from "react";

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

const passStateToProps = ({ activeChat }: any) => ({
    activeChat: activeChat.chat,
});

const passDispatchToProps = (dispatch: any) => ({
    setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
});

export const ChatContainerBody = connect(
    passStateToProps,
    passDispatchToProps
)(({ activeChat: { messages }, setDropMenu }: any) => {
    const chatRef: any = useRef(null);
    const me = "2339b0c3-cbdc-4944-9b67-3812998d9879";

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, []);

    return (
        <div
            ref={chatRef}
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
            {messages.map((chatData: any) => {
                console.log(chatData);
                const owner = chatData.user === me;
                return (
                    <Message key={chatData.id} owner={owner} data={chatData} />
                );
            })}
        </div>
    );
});
