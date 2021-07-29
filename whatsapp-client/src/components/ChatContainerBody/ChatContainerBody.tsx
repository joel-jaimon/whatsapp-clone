import { useContext } from "react";
import { dropDownContext } from "../../context/dropDownContext";
import s from "./chatContainerBodyStyles.module.scss";
import { Text } from "./components/Messages/Text";
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
        <Text type="right" />
      </div>

      <div className={s.RightWrap}>
        <Voice type="right" />
      </div>
      <div className={s.RightWrap}>
        <Voice type="right" />
      </div>
      <div className={s.LeftWrap}>
        <Voice type="left" />
      </div>
    </div>
  );
};
