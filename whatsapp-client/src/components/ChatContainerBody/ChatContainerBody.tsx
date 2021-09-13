import s from "./chatContainerBodyStyles.module.scss";
import { File } from "./components/Messages/File";
import { Picture } from "./components/Messages/Picture";
import { Text } from "./components/Messages/Text";
import { Video } from "./components/Messages/Video";
import { Voice } from "./components/Messages/Voice";
import { connect } from "react-redux";
import { useEffect, useRef } from "react";
import { setDropDown } from "../../redux/reducers/dropDown";

const Message = ({ data, _side, extraParam }: any) => {
  switch (data.msgType) {
    case "text":
      return <Text msgPosition={_side} {...data} extraParam={extraParam} />;
    case "video":
      return <Video msgPosition={_side} {...data} extraParam={extraParam} />;
    case "voice":
      return <Voice msgPosition={_side} {...data} extraParam={extraParam} />;
    case "document":
      return <File extraParam={extraParam} msgPosition={_side} {...data} />;
    case "image":
      return <Picture msgPosition={_side} {...data} extraParam={extraParam} />;
  }
  return <div />;
};

const passStateToProps = ({ chatState, authState }: any) => ({
  activeChat: chatState.chat[chatState.activeChat],
  authState: authState.auth,
  authUsers: chatState.authUsers,
});

const passDispatchToProps = (dispatch: any) => ({
  setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
});

export const ChatContainerBody = connect(
  passStateToProps,
  passDispatchToProps
)(({ activeChat, setDropMenu, authState, authUsers }: any) => {
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
      {activeChat?.messages.map((chatData: any, i: number) => {
        const owner = chatData.sentBy === authState.objectId;
        const _classname = owner ? s.RightWrap : s.LeftWrap;
        const _side = owner ? "right" : "left";
        return (
          <div className={_classname}>
            <Message
              _side={_side}
              key={chatData._id}
              data={chatData}
              extraParam={{
                owner,
                by: authUsers[chatData.sentBy]?.displayName
                  .split(" ")
                  .slice(0, 2)
                  .join(" "),
                color: authUsers[chatData.sentBy]?.color,
                prevMsgBySameUser:
                  i > 0
                    ? activeChat?.messages[i - 1].sentBy === chatData.sentBy
                    : false,
              }}
            />
          </div>
        );
      })}
    </div>
  );
});
