import { Avatar } from "@material-ui/core";
import s from "../sidebarModal.module.scss";
import { connect } from "react-redux";
import { createNewGroup, setActiveChat } from "redux/reducers/chat";
import { useState } from "react";
import { ObjectID } from "bson";
import { newGroupIcon } from "./newGroupIcon";

const passStateToProps = ({ chatState, authState }: any) => ({
  authUsers: chatState.authUsers,
  activeChat: chatState.chat[chatState?.activeChat],
  guestUsers: chatState.guestUsers,
  chats: chatState.chat,
  authState,
});

const passDispatchToProps = (dispatch: any) => ({
  setActiveChat: (activeChat: any) => dispatch(setActiveChat(activeChat)),
  createNewGroupStart: (payload: any) => dispatch(createNewGroup(payload)),
});

export const AddUsersToGroup = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    authState,
    authUsers,
    chats,
    setActiveChat,
    activeChat,
    closeModal,
    createNewGroupStart,
  }: any) => {
    const [userList, setUserList] = useState(authUsers);
    const [grpName, setGrpName] = useState("");
    const selectUser = (add: string) => {
      setUserList((prev: any) => ({
        ...prev,
        [add]: {
          ...prev[add],
          selected: true,
        },
      }));
    };

    const unselectUser = (remove: string) => {
      setUserList((prev: any) => ({
        ...prev,
        [remove]: {
          ...prev[remove],
          selected: false,
        },
      }));
    };

    const createNewGroup = ({}: any) => {
      if (grpName.length <= 1) return;
      const participants: any = [];
      participants.push({
        objectId: authState.auth.objectId,
        lastViewed: Date.now(),
      });
      Object.entries(userList).forEach((e: any) => {
        if (e[1].selected) {
          participants.push({
            objectId: e[0],
            lastViewed: Date.now(),
          });
        }
      });
      createNewGroupStart({
        _id: new ObjectID().toString(),
        name: grpName,
        avatar: newGroupIcon,
        createdOn: Date.now(),
        modifiedOn: Date.now(),
        participants,
        type: "group",
        desc: `Group created by ${authState.auth.displayName}`,
      });
      closeModal();
    };

    return (
      <div className={s.sidebarModalBody}>
        <div className={`${s.allChats} ${s.adduserstog}`}>
          <div className={s.newGroupInfo}>
            <div className={s.addedUserInfo}>
              <div className={s.selectedUserDiv}>
                {Object.entries(userList)
                  .filter((e: any) => (!e[1]?.selected ? false : true))
                  .map((data: any) => {
                    return (
                      <div key={data[0]} className={s.selectedUserChip}>
                        <img src={data[1].avatar} alt={data[1].displayName} />
                        <small>{data[1].displayName}</small>
                        <svg
                          onClick={() => unselectUser(data[0])}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className={s.unseletIcon}
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg>
                      </div>
                    );
                  })}
              </div>
            </div>
            <input
              value={grpName}
              onChange={(e: any) => setGrpName(e.target.value)}
              maxLength={30}
              placeholder="Type a group name..."
              type="text"
            />
          </div>
          <p className={s.text}>AUTH CONTACTS</p>
          <div className={s.chatsContainer}>
            {Object.entries(userList)
              .filter((e: any) => (e[1]?.selected ? false : true))
              .map((data: any) => {
                return (
                  <div
                    //   onClick={() => handleOnClick(data)}
                    className={s.availableUsers}
                    key={data[0]}
                    onClick={() => selectUser(data[0])}
                  >
                    <div className={s.avatar}>
                      <div
                        className={`
                        ${s.activeStatus} ${
                          data[1]?.status
                            ? s.activeIndicater
                            : s.inactiveIndicater
                        }`}
                      ></div>
                      <Avatar src={data[1].avatar} alt="sidebar-chat-avatar" />
                    </div>
                    <span>
                      <p>{data[1].displayName}</p>
                      <small>{data[1].about}</small>
                    </span>
                  </div>
                );
              })}
          </div>
          <button onClick={createNewGroup} className={s.createGrpButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="white"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);
