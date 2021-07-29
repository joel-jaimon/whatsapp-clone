import { useContext } from "react";
import { dropDownContext } from "../../context/dropDownContext";
import s from "./chatContainerBodyStyles.module.scss";
import { File } from "./components/Messages/File";
import { Picture } from "./components/Messages/Picture";
import { Text } from "./components/Messages/Text";
import { Video } from "./components/Messages/Video";
import { Voice } from "./components/Messages/Voice";

export const ChatContainerBody = () => {
  const { dropMenu, setDropMenu } = useContext(dropDownContext);

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
      <div className={s.LeftWrap}>
        <Text type="left" />
      </div>
      <div className={s.RightWrap}>
        <Voice type="right" />
      </div>
      <div className={s.RightWrap}>
        <Video type="right" />
      </div>
      <div className={s.RightWrap}>
        <File type="right" />
      </div>
      <div className={s.RightWrap}>
        <Text type="right" />
      </div>
      <div className={s.LeftWrap}>
        <Voice type="left" />
      </div>
      <div className={s.RightWrap}>
        <Picture
          type="right"
          src={
            "https://images.unsplash.com/photo-1521676259650-675b5bfec1ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
          }
        />
      </div>
      <div className={s.LeftWrap}>
        <File type="left" />
      </div>
      <div className={s.LeftWrap}>
        <Picture
          type="left"
          src={
            "https://images.unsplash.com/photo-1627573002203-abedce71ddb6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          }
        />
      </div>
    </div>
  );
};
