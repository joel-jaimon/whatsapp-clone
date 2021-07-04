import { ChatContainerBody } from "../ChatContainerBody/ChatContainerBody";
import { ChatContainerFooter } from "../ChatContainerFooter/ChatContainerFooter";
import { ChatContainerHead } from "../ChatContainerHead/ChatContainerHead";
import s from "./chatContainerStyles.module.scss";

export const ChatContainer = () => {
  return (
    <div className={s.chatContainer}>
      <ChatContainerHead />
      <ChatContainerBody />
      <ChatContainerFooter />
    </div>
  );
};
