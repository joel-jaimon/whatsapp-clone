import s from "./chatContainerBodyStyles.module.scss";
import { File } from "./components/Messages/File";
import { Picture } from "./components/Messages/Picture";
import { Text } from "./components/Messages/Text";
import { Video } from "./components/Messages/Video";
import { Voice } from "./components/Messages/Voice";
import { connect } from "react-redux";
import { useEffect, useRef } from "react";
import { setDropDown } from "../../redux/reducers/dropDown";

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

const passStateToProps = ({ chatState, authState }: any) => ({
  activeChat: chatState.chat[chatState.activeChat],
  authState: authState.auth,
});

const passDispatchToProps = (dispatch: any) => ({
  setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
});

export const ChatContainerBody = connect(
  passStateToProps,
  passDispatchToProps
)(({ activeChat, setDropMenu, authState }: any) => {
  const chatRef: any = useRef(null);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [activeChat?.messages]);

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
      {activeChat?.messages.map((chatData: any) => {
        const owner = chatData.sentBy === authState.objectId;
        return <Message key={chatData.id} owner={owner} data={chatData} />;
      })}
    </div>
  );
});
