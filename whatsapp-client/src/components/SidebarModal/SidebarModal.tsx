import { connect } from "react-redux";
import s from "./sidebarModal.module.scss";
import { UserSidebar } from "./Modals/UserSidebar";
import { NewMsgSidebar } from "./Modals/NewMsgSidebar";
import { ArchivedSidebar } from "./Modals/ArchivedSidebar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { setSidebarModal } from "../../redux/actions/sidebarChatModal";

const passStateToProps = ({ sidebarModal }: any) => {
    return {
        sidebarModal: sidebarModal.modal,
    };
};

const passDispatchToProps = (dispatch: any) => ({
    setSidebarModal: (modal: any) => dispatch(setSidebarModal(modal)),
});

const Modal = ({ sidebarModal }: any) => {
    switch (sidebarModal?.type) {
        case "archiveSidebar":
            return <ArchivedSidebar />;
        case "newMsgSidebar":
            return <NewMsgSidebar />;
        case "userSidebar":
            return <UserSidebar />;
        default:
            return <div />;
    }
};

export const SidebarModal = connect(
    passStateToProps,
    passDispatchToProps
)(({ sidebarModal, setSidebarModal }: any) => {
    return sidebarModal?.type ? (
        <div className={s.sidebarModal}>
            <div className={s.sidebarModalHeader}>
                <span>
                    <ArrowBackIcon
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={() => setSidebarModal(null)}
                    />
                </span>
                <p>Profile</p>
            </div>
            <Modal sidebarModal={sidebarModal} />
        </div>
    ) : (
        <div />
    );
});
