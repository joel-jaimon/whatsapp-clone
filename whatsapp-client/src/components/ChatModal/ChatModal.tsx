import s from "./chatModal.module.scss";
import { connect } from "react-redux";
import { SearchInMsgModal } from "./Modals/SearchInMsgModal/SearchInMsgModal";
import { UserInfoModal } from "./Modals/UserInfoModal/UserInfoModal";
import { ChatContainerModalAnimation } from "animations/chatContainerModal/ChatContainerModalAnimation";
import { useState } from "react";
import { setChatContainerModal } from "redux/reducers/chatContainerModal";

const passStateToProps = ({ chatModal }: any) => ({
  chatContainerModal: chatModal.modal,
});

const passDispatchToProps = (dispatch: any) => ({
  setChatModal: (modal: any) => dispatch(setChatContainerModal(modal)),
});

export const ChatModal = connect(
  passStateToProps,
  passDispatchToProps
)(({ chatContainerModal, setChatModal }: any) => {
  const [reverse, setReverse] = useState(false);
  const onClose = () => {
    if (reverse) {
      setReverse(false);
      setChatModal(null);
    }
  };

  const _modal = () => {
    switch (chatContainerModal.type) {
      case "searchMsg":
        return (
          <SearchInMsgModal
            name="Joel Jaimon"
            setReverseAnimation={setReverse}
          />
        );
      case "userinfoModal":
        return (
          <UserInfoModal name="Joel Jaimon" setReverseAnimation={setReverse} />
        );
    }
  };

  return (
    <ChatContainerModalAnimation
      onClose={onClose}
      reverse={reverse}
      className={s.chatModal}
    >
      {_modal()}
    </ChatContainerModalAnimation>
  );
});
