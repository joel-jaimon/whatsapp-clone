import s from "./chatModal.module.scss";
import { SearchInMsgModal } from "./Modals/SearchInMsgModal/SearchInMsgModal";
import { UserInfoModal } from "./Modals/UserInfoModal/UserInfoModal";

export const ChatModal = ({ modal, setModal }: any) => {
  const _modal = () => {
    switch (modal.type) {
      case "searchMsg":
        return <SearchInMsgModal setModal={setModal} name="Joel Jaimon" />;
      case "userinfoModal":
        return <UserInfoModal setModal={setModal} name="Joel Jaimon" />;
    }
  };

  return <div className={s.chatModal}>{_modal()}</div>;
};
