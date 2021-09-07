import { useState } from "react";
import { connect } from "react-redux";
import s from "./chatStyles.module.scss";
import { Avatar } from "@material-ui/core";
import { MsgPreview } from "./Components/MsgPreview";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { setDropDown } from "../../redux/reducers/dropDown";
import { setActiveChat } from "../../redux/reducers/chat";
import { setChatContainerModal } from "../../redux/reducers/chatContainerModal";

const passStateToProps = ({ chatState }: any) => ({
  activeChat: chatState.chat[chatState.activeChat],
});

const passDispatchToProps = (dispatch: any) => ({
  setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
  setActiveChat: (activeChat: any) => dispatch(setActiveChat(activeChat)),
  setChatModal: (chatModal: any) => dispatch(setChatContainerModal(chatModal)),
});

export const SidebarChats = connect(
  passStateToProps,
  passDispatchToProps
)(({ data, setDropMenu, setActiveChat, setChatModal, userMode }: any) => {
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
    setActiveChat(data.id);
  };

  const [expandMore, setExpandMore] = useState(false);

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
      <Avatar src={data.avatar} alt="sidebar-chat-avatar" />
      <span className={s.chatInfo}>
        <div>
          <p>{data.name}</p>
          {<p className={s.time}>Thursday</p>}
        </div>
        <div>
          <MsgPreview {...data} />
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
});
