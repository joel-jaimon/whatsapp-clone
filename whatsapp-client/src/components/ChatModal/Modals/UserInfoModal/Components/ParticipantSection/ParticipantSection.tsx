import s from "./participationSection.module.scss";
import { connect } from "react-redux";
import { createNewChat, setActiveChat } from "redux/reducers/chat";
import { setSidebarModal } from "redux/reducers/sidebarChatModal";
import { Avatar } from "@material-ui/core";

const passStateToProps = ({ chatState, authState }: any) => ({
  activeChat: chatState.chat[chatState.activeChat],
  authUsers: chatState.authUsers,
  chats: chatState.chat,
  authState,
});

const passDispatchToProps = (dispatch: any) => ({
  setActiveChat: (activeChat: any) => dispatch(setActiveChat(activeChat)),
  createNewChat: (payload: any) => dispatch(createNewChat(payload)),
  setSidebarModal: (sidebarModal: any) =>
    dispatch(setSidebarModal(sidebarModal)),
});

export const ParticipantSection = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    activeChat,
    chats,
    authUsers,
    authState,
    setActiveChat,
    onClose,
  }: any) => {
    const handleOnClick = (data: any) => {
      const doesChatExist: any = Object.entries(chats).find((chat: any) => {
        const refChat = chat[1].chatInfo;
        const bool1 = refChat.participants.find(
          (user: any) => user.objectId === data.objectId
        );
        const bool2 = refChat.type === "chat";
        return bool1 && bool2;
      });

      onClose(true);

      if (doesChatExist) {
        setActiveChat({
          prevActiveChat: {
            prevActiveChatId: activeChat?.chatInfo._id,
            prevActiveChatType: activeChat?.chatInfo.type,
          },
          switchTo: doesChatExist[1].chatInfo._id,
        });
      } else {
        createNewChat({
          participants: [
            {
              lastViewed: null,
              objectId: data[0],
            },
            {
              lastViewed: Date.now(),
              objectId: authState.auth.objectId,
            },
          ],
          type: "chat",
          modifiedOn: Date.now(),
        });
      }
    };

    return (
      <div className={s.participants}>
        <p className="chatModalSectionTitle">Participants</p>
        <div className={s.chatsContainer}>
          {Object.entries(activeChat.chatInfo.participants)
            .filter(
              (_data: any) => _data[1].objectId != authState.auth.objectId
            )
            .map((_data: any) => {
              const data = authUsers[_data[1].objectId];
              console.log(authUsers, _data);
              return (
                <div
                  onClick={() => handleOnClick(data)}
                  className={s.availableUsers}
                  key={data.objectId}
                >
                  <div className={s.avatar}>
                    <div
                      className={`
                        ${s.activeStatus} ${
                        data?.status ? s.activeIndicater : s.inactiveIndicater
                      }`}
                    ></div>
                    <Avatar src={data.avatar} alt="sidebar-chat-avatar" />
                  </div>
                  <span>
                    <p>{data.displayName}</p>
                    <small>{data.about}</small>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
);
