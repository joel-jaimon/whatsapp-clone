import { useContext } from "react";
import { dropDownContext } from "../../context/dropDownContext";
import s from "./chatContainerBodyStyles.module.scss";

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
    ></div>
  );
};
