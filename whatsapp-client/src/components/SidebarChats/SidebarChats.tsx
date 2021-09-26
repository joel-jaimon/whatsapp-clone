import { useState } from "react";
import { connect } from "react-redux";
import s from "./chatStyles.module.scss";
import { Avatar } from "@material-ui/core";
import { MsgPreview } from "./Components/MsgPreview";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { setDropDown } from "redux/reducers/dropDown";
import { setActiveChat } from "redux/reducers/chat";
import { setChatContainerModal } from "redux/reducers/chatContainerModal";

const passStateToProps = ({ chatState, authState }: any) => ({
  activeChat: chatState.chat[chatState?.activeChat],
  allUsers: chatState.authUsers,
  myObjId: authState.auth.objectId,
});

const passDispatchToProps = (dispatch: any) => ({
  setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
  setActiveChat: (activeChat: any) => dispatch(setActiveChat(activeChat)),
  setChatModal: (chatModal: any) => dispatch(setChatContainerModal(chatModal)),
});

export const SidebarChats = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    data,
    setDropMenu,
    setActiveChat,
    setChatModal,
    allUsers,
    myObjId,
    activeChat,
  }: any) => {
    const handleDropMenuClicks = (e: any, type: string) => {
      e.stopPropagation();
      setDropMenu({
        type,
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        params: {},
      });
    };

    const handleActiveChat = () => {
      setDropMenu(false);
      setChatModal(null);

      setActiveChat({
        prevActiveChat: {
          prevActiveChatId: activeChat?.chatInfo._id,
          prevActiveChatType: activeChat?.chatInfo.type,
        },
        switchTo: data.chatInfo._id,
      });
    };

    const [expandMore, setExpandMore] = useState(false);

    const otherFriend =
      data.chatInfo.type === "chat"
        ? data.chatInfo.participants.find((e: any) => e.objectId !== myObjId)
        : null;

    return (
      <div
        onMouseOver={() => setExpandMore(true)}
        onMouseLeave={() => setExpandMore(false)}
        onClick={handleActiveChat}
        onContextMenu={(e: any) => {
          e.preventDefault();
          setDropMenu({
            type: "chatInfo",
            position: {
              x: e.clientX,
              y: e.clientY,
            },
            params: {},
          });
        }}
        className={s.sidebarChats}
      >
        <div className={s.avatar}>
          {otherFriend ? (
            <div
              className={`
                        ${s.activeStatus} ${
                allUsers[otherFriend.objectId].status
                  ? s.activeIndicater
                  : s.inactiveIndicater
              }`}
            ></div>
          ) : null}
          <Avatar
            src={
              otherFriend
                ? allUsers[otherFriend.objectId]?.avatar
                : data.chatInfo?.avatar
            }
            alt="sidebar-chat-avatar"
          />
        </div>

        <span className={s.chatInfo}>
          <div>
            <p>
              {otherFriend
                ? allUsers[otherFriend.objectId]?.displayName
                : data.chatInfo?.name}
            </p>
            {<p className={s.time}>Thursday</p>}
          </div>
          <div>
            <MsgPreview
              {...data.messages[data.messages.length - 1]}
              otherUser={allUsers[otherFriend?.objectId]?.displayName}
            />
            {expandMore ? (
              <ExpandMoreIcon
                onClick={(e) => handleDropMenuClicks(e, "chatInfo")}
                style={{
                  height: 20,
                  color: "rgb(130, 134, 137)",
                }}
              />
            ) : null}
          </div>
        </span>
      </div>
    );
  }
);
