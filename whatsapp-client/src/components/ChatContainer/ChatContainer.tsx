import { connect } from "react-redux";
import s from "./chatContainerStyles.module.scss";
import { ChatModal } from "../ChatModal/ChatModal";
import { ChatContainerBody } from "../ChatContainerBody/ChatContainerBody";
import { ChatContainerFooter } from "../ChatContainerFooter/ChatContainerFooter";
import { ChatContainerHead } from "../ChatContainerHead/ChatContainerHead";

const passStateToProps = ({ chatModal }: any) => ({
    chatContainerModal: chatModal.modal,
});

export const ChatContainer = connect(passStateToProps)(
    ({ chatContainerModal }: any) => {
        return (
            <div className={s.chatContainer}>
                <div className={s.chatMain}>
                    <ChatContainerHead />
                    <ChatContainerBody />
                    <ChatContainerFooter />
                </div>
                {chatContainerModal && <ChatModal />}
            </div>
        );
    }
);
