import { connect } from "react-redux";
import s from "./chatContainerHeader.module.scss";
import { setChatContainerModal } from "redux/reducers/chatContainerModal";
import { setDropDown } from "redux/reducers/dropDown";
import { formatTime } from "utils/formatTime";
import { initCall } from "redux/reducers/callerInfo";

const passStateToProps = ({ chatState, dropDownMenu, authState }: any) => ({
  dropDown: dropDownMenu.dropDown,
  authUser: authState.auth,
  activeChat: chatState.chat[chatState.activeChat],
  allUsers: chatState.authUsers,
});

const passDispatchToProps = (dispatch: any) => ({
  setDropDown: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
  setChatContainerModal: (modal: any) => dispatch(setChatContainerModal(modal)),
  initiateCall: (payload: any) => dispatch(initCall(payload)),
});

export const ChatContainerHead = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    activeChat,
    setChatContainerModal,
    dropDown,
    setDropDown,
    authUser,
    allUsers,
    initiateCall,
  }: any) => {
    const toggleDropdown = (e: any) => {
      if (dropDown.type === "activeChatInfoToggle") {
        setDropDown({
          type: "",
        });
      } else {
        setDropDown({
          type: "activeChatInfoToggle",
          position: {
            x: e.target.getBoundingClientRect().left - 110,
            y: e.target.getBoundingClientRect().top + 34,
          },
          params: {},
        });
      }
    };

    const otherFriend =
      activeChat.chatInfo.type === "chat"
        ? activeChat.chatInfo.participants.find((e: any) => {
            console.log(e);
            return e.objectId !== authUser.objectId;
          })
        : null;

    const initiateACall = () => {
      initiateCall({
        active: true,
        callBy: authUser.objectId,
        refId: activeChat.chatInfo._id,
        extraParam: otherFriend
          ? {
              displayName: authUser.displayName,
              avatar: authUser.avatar,
              callTo: otherFriend.objectId,
            }
          : null,
      });
    };

    return (
      <div className={s.chatContainerHead}>
        <div
          onClick={() =>
            setChatContainerModal({
              type: "userinfoModal",
            })
          }
          className={s.roomA}
        >
          <span className={s.avatar}>
            {allUsers[otherFriend?.objectId]?.avatar ||
            activeChat?.chatInfo.avatar ? (
              <img
                src={
                  otherFriend
                    ? allUsers[otherFriend?.objectId]?.avatar
                    : activeChat?.chatInfo.avatar
                }
                alt="chat-avatar"
              />
            ) : (
              <div className={s.mainIcon}>
                <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                </svg>
              </div>
            )}
          </span>
          <div className={s.roomInfo}>
            <p>
              {otherFriend
                ? allUsers[otherFriend.objectId]?.displayName
                : activeChat?.chatInfo.name}
            </p>
            <small>
              {otherFriend
                ? allUsers[otherFriend.objectId]?.status
                  ? "Online"
                  : `Last seen at ${formatTime(
                      allUsers[otherFriend.objectId]?.lastSeen
                    )}, ${new Date(allUsers[otherFriend.objectId]?.lastSeen)
                      .toString()
                      .slice(0, 16)}`
                : "Info"}
            </small>
          </div>
        </div>

        <div className={s.roomControls}>
          {otherFriend ? (
            <button
              style={{
                opacity: !allUsers[otherFriend.objectId]?.status ? 0.4 : 1,
                pointerEvents: !allUsers[otherFriend.objectId]?.status
                  ? "none"
                  : "auto",
              }}
              disabled={!allUsers[otherFriend.objectId]?.status}
              onClick={initiateACall}
              className={`icons ${s.callButton}`}
            >
              {allUsers[otherFriend.objectId]?.status && (
                <span className={s.activeBullet} />
              )}
              <svg
                fill="#b1b3b5"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path>
              </svg>
            </button>
          ) : null}
          <span
            onClick={() =>
              setChatContainerModal({
                type: "searchMsg",
              })
            }
            className="icons"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
              ></path>
            </svg>
          </span>
          <span
            style={
              dropDown.type === "activeChatInfoToggle"
                ? {
                    backgroundColor: "#292929",
                  }
                : {}
            }
            onClick={toggleDropdown}
            className={`icons`}
          >
            <svg
              style={{
                pointerEvents: "none",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    );
  }
);
