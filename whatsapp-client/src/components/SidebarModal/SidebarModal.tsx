import { connect } from "react-redux";
import s from "./sidebarModal.module.scss";
import { UserSidebar } from "./Modals/UserSidebar";
import { NewMsgSidebar } from "./Modals/NewMsgSidebar";
import { ArchivedSidebar } from "./Modals/ArchivedSidebar";
import { AddUsersToGroup } from "./Modals/AddUsersToGroup";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { setSidebarModal } from "redux/reducers/sidebarChatModal";
import { SidebarModalAnimation } from "animations/sidebarModal/SidebarModalAnimation";
import { useState } from "react";

const passStateToProps = ({ sidebarModal }: any) => {
  return {
    sidebarModal: sidebarModal.modal,
  };
};

const passDispatchToProps = (dispatch: any) => ({
  setSidebarModal: (modal: any) => dispatch(setSidebarModal(modal)),
});

const Modal = ({ sidebarModal, closeModal }: any) => {
  switch (sidebarModal?.type) {
    case "archiveSidebar":
      return <ArchivedSidebar />;
    case "newMsgSidebar":
      return <NewMsgSidebar closeModal={closeModal} />;
    case "userSidebar":
      return <UserSidebar />;
    case "addUsersToGroup":
      return <AddUsersToGroup closeModal={closeModal} />;
    default:
      return <div />;
  }
};

export const SidebarModal = connect(
  passStateToProps,
  passDispatchToProps
)(({ sidebarModal, setSidebarModal }: any) => {
  const [reverse, setReverse] = useState(false);
  const closeModal = () => {
    if (reverse) {
      setReverse(false);
      setSidebarModal(null);
    }
  };
  return sidebarModal?.type ? (
    <SidebarModalAnimation
      reverse={reverse}
      closeModal={closeModal}
      className={s.sidebarModal}
    >
      <div className={s.sidebarModalHeader}>
        <span>
          <ArrowBackIcon
            style={{
              cursor: "pointer",
            }}
            onClick={() => setReverse(true)}
          />
        </span>
        <p>{sidebarModal.params.headerTitle}</p>
      </div>
      <Modal closeModal={() => setReverse(true)} sidebarModal={sidebarModal} />
    </SidebarModalAnimation>
  ) : (
    <div />
  );
});
