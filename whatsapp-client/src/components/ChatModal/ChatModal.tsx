import s from "./chatModal.module.scss";
import { connect } from "react-redux";
import { SearchInMsgModal } from "./Modals/SearchInMsgModal/SearchInMsgModal";
import { UserInfoModal } from "./Modals/UserInfoModal/UserInfoModal";

const passStateToProps = ({ chatModal }: any) => ({
    chatContainerModal: chatModal.modal,
});

const passDispatchToProps = (dispatch: any) => {};

export const ChatModal = connect(
    passStateToProps,
    passDispatchToProps
)(({ chatContainerModal }: any) => {
    const _modal = () => {
        switch (chatContainerModal.type) {
            case "searchMsg":
                return <SearchInMsgModal name="Joel Jaimon" />;
            case "userinfoModal":
                return <UserInfoModal name="Joel Jaimon" />;
        }
    };

    return <div className={s.chatModal}>{_modal()}</div>;
});
