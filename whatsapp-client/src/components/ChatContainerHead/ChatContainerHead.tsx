import { connect } from "react-redux";
import s from "./chatContainerHeader.module.scss";
import { setChatContainerModal } from "../../redux/reducers/chatContainerModal";
import { setRoomModal } from "../../redux/reducers/roomModal";
import { setDropDown } from "../../redux/reducers/dropDown";
import { formatTime } from "../../utils/formatTime";

const passStateToProps = ({ chatState, dropDownMenu, authState }: any) => ({
  dropDown: dropDownMenu.dropDown,
  myObjId: authState.auth.objectId,
  activeChat: chatState.chat[chatState.activeChat],
  allUsers: chatState.authUsers,
});

const passDispatchToProps = (dispatch: any) => ({
  setDropDown: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
  setChatContainerModal: (modal: any) => dispatch(setChatContainerModal(modal)),
  setRoomModal: (roomModal: any) => dispatch(setRoomModal(roomModal)),
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
    setRoomModal,
    myObjId,
    allUsers,
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
        ? activeChat.chatInfo.participants.find((e: string) => e !== myObjId)
        : null;

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
            <img
              src={
                otherFriend
                  ? allUsers[otherFriend]?.avatar
                  : activeChat?.chatInfo.avatar
              }
              alt="chat-avatar"
            />
          </span>
          <div className={s.roomInfo}>
            <p>
              {otherFriend
                ? allUsers[otherFriend]?.displayName
                : activeChat?.chatInfo.name}
            </p>
            <small>
              {otherFriend
                ? allUsers[otherFriend]?.status
                  ? "Online"
                  : `${formatTime(allUsers[otherFriend]?.lastSeen)}, ${new Date(
                      allUsers[otherFriend]?.lastSeen
                    )
                      .toString()
                      .slice(0, 16)}`
                : "Info"}
            </small>
          </div>
        </div>

        <div className={s.roomControls}>
          <span
            onClick={() => {
              setRoomModal(true);
            }}
            className="icons"
          >
            <svg
              fill="#b1b3b5"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path>
            </svg>
          </span>
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
