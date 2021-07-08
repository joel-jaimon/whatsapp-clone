import { ChatContainerBody } from "../ChatContainerBody/ChatContainerBody";
import { ChatContainerFooter } from "../ChatContainerFooter/ChatContainerFooter";
import { ChatContainerHead } from "../ChatContainerHead/ChatContainerHead";
import { ChatModal } from "../ChatModal/ChatModal";
import s from "./chatContainerStyles.module.scss";

export const ChatContainer = () => {
  return (
    <div className={s.chatContainer}>
      <div className={s.chatMain}>
        <ChatContainerHead />
        <ChatContainerBody />
        <ChatContainerFooter />
      </div>
      <ChatModal />
    </div>
  );
};
