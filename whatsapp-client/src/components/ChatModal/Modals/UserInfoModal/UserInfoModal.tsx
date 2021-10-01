import s from "../../chatModal.module.scss";
import { connect } from "react-redux";
import { AvatarSection } from "./Components/AvatarSection/AvatarSection";
import { DescSection } from "./Components/DescSection/DescSection";
import { GeneralSettingsSection } from "./Components/GeneralSettingsSection/generalSettingsSection";
import { MediaSection } from "./Components/MediaSection/MediaSection";
import { ParticipantSection } from "./Components/ParticipantSection/ParticipantSection";
import { setChatContainerModal } from "redux/reducers/chatContainerModal";

const passStateToProps = ({ chatModal, chatState, authState }: any) => ({
  chatContainerModal: chatModal.modal,
  allUsers: chatState.authUsers,
  myObjId: authState.auth.objectId,
  activeChat: chatState.chat[chatState.activeChat],
});

const passDispatchToProps = (dispatch: any) => ({
  setChatContainerModal: (modal: any) => dispatch(setChatContainerModal(modal)),
});

export const UserInfoModal = connect(
  passStateToProps,
  passDispatchToProps
)(({ activeChat, setReverseAnimation, myObjId, allUsers }: any) => {
  const otherFriend =
    activeChat.chatInfo.type === "chat"
      ? activeChat.chatInfo.participants.find((e: any) => {
          console.log(e);
          return e.objectId !== myObjId;
        })
      : null;

  return (
    <div className={s.userInfoModal}>
      <div className={s.modalHead}>
        <svg
          onClick={() => setReverseAnimation(true)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="currentColor"
            d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"
          ></path>
        </svg>
        <p>{otherFriend ? "User Info" : "Group info"}</p>
      </div>
      <div className={s.infoModalBody}>
        <AvatarSection name="Notes" otherFriend={otherFriend?.objectId} />
        <DescSection
          userInfo={allUsers[otherFriend?.objectId]}
          desc={activeChat?.chatInfo?.desc}
        />
        <MediaSection />
        {otherFriend ? null : <GeneralSettingsSection />}
        {otherFriend ? null : (
          <ParticipantSection onClose={() => setReverseAnimation(true)} />
        )}
        {otherFriend ? null : (
          <div className={s.exit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M16.6 8.1l1.2-1.2 5.1 5.1-5.1 5.1-1.2-1.2 3-3H8.7v-1.8h10.9l-3-3zM3.8 19.9h9.1c1 0 1.8-.8 1.8-1.8v-1.4h-1.8v1.4H3.8V5.8h9.1v1.4h1.8V5.8c0-1-.8-1.8-1.8-1.8H3.8C2.8 4 2 4.8 2 5.8v12.4c0 .9.8 1.7 1.8 1.7z"
              ></path>
            </svg>
            <p>Exit Group</p>
          </div>
        )}

        <div className={s.report}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
          </svg>
          <p>{otherFriend ? "Report User" : "Report Group"}</p>
        </div>
      </div>
    </div>
  );
});
