import { useState } from "react";
import { ChatContainerBody } from "../ChatContainerBody/ChatContainerBody";
import { ChatContainerFooter } from "../ChatContainerFooter/ChatContainerFooter";
import { ChatContainerHead } from "../ChatContainerHead/ChatContainerHead";
import { ChatModal } from "../ChatModal/ChatModal";
import s from "./chatContainerStyles.module.scss";

export const ChatContainer = () => {
    const [modal, setModal] = useState<null | string>(null);
    return (
        <div className={s.chatContainer}>
            <div className={s.chatMain}>
                <ChatContainerHead setModal={setModal} />
                <ChatContainerBody />
                <ChatContainerFooter />
            </div>
            {modal && <ChatModal modal={modal} setModal={setModal} />}
        </div>
    );
};
