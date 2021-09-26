import { useState } from "react";
import s from "./avatarSection.module.scss";
import compress from "react-image-file-resizer";
import { connect } from "react-redux";
import { setDropDown } from "redux/reducers/dropDown";
import { setGlobalModal } from "redux/reducers/globalModal";
import { initGroupInfoUpdate } from "redux/reducers/chat";

const passStateToProps = ({ dropDownMenu, chatState }: any) => ({
  dropMenu: dropDownMenu.dropDown,
  allUsers: chatState.authUsers,
  activeChat: chatState.chat[chatState.activeChat],
});

const passDispatchToProps = (dispatch: any) => ({
  setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
  initGroupInfoUpdate: (payload: any) => dispatch(initGroupInfoUpdate(payload)),
});

export const AvatarSection = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    otherFriend,
    allUsers,
    dropMenu,
    setDropMenu,
    setGlobalModal,
    initGroupInfoUpdate,
    activeChat: { chatInfo },
  }: any) => {
    const [editName, setEditName] = useState(false);
    const [newName, setNewName] = useState(
      chatInfo.name ?? allUsers[otherFriend]?.displayName
    );
    const [hoverForNewAvatar, setHoverForNewAvatar] = useState(false);

    const handleCompressedImage = (base64Data: string) => {
      initGroupInfoUpdate({
        groupId: chatInfo._id,
        updatedParams: {
          avatar: base64Data,
        },
      });
      setDropMenu("");
    };

    const handleRemoveImage = () => {
      setGlobalModal({
        type: "removeAvatar",
        params: {
          removeAvatar: () => {
            initGroupInfoUpdate({
              groupId: chatInfo._id,
              updatedParams: {
                avatar: null,
              },
            });
            setGlobalModal(null);
          },
        },
      });
      setDropMenu("");
    };

    const handleAvatarChange = async (file: any) => {
      compress.imageFileResizer(
        file,
        480,
        480,
        "PNG",
        70,
        0,
        handleCompressedImage,
        "base64"
      );
    };

    const handleNameUpdate = () => {
      initGroupInfoUpdate({
        groupId: chatInfo._id,
        updatedParams: {
          name: newName,
        },
      });
      setEditName(false);
    };

    const handleDropMenuClicks = (e: any, type: string) => {
      setDropMenu({
        type,
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        params: {
          handleAvatarChange: handleAvatarChange,
          handleRemoveImage: handleRemoveImage,
          src: type === "changeAvatar" ? chatInfo?.avatar : null,
        },
      });
    };

    return (
      <div className={s.avatarSection}>
        <div className={s.infoModalAvatar}>
          {chatInfo?.avatar ||
          (otherFriend && allUsers[otherFriend]?.avatar) ? (
            <div
              onMouseLeave={() => setHoverForNewAvatar(false)}
              onMouseOver={() => setHoverForNewAvatar(true)}
              className={s.grpIcon}
            >
              {/* @ts-ignore */}
              {!otherFriend &&
                (hoverForNewAvatar || dropMenu?.type === "changeAvatar") && (
                  <AddNewAvatar
                    handleAvatarChange={handleAvatarChange}
                    handleDropMenuClicks={(e: any) =>
                      handleDropMenuClicks(e, "changeAvatar")
                    }
                    type="change"
                  />
                )}
              <img
                src={
                  otherFriend ? allUsers[otherFriend].avatar : chatInfo?.avatar
                }
              />
            </div>
          ) : (
            <div className={s.grpIcon}>
              <AddNewAvatar
                type="add"
                handleDropMenuClicks={(e: any) =>
                  handleDropMenuClicks(e, "addAvatar")
                }
                handleAvatarChange={handleAvatarChange}
              />
              <div className={s.mainIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 212 212"
                  width="212"
                  height="212"
                >
                  <path
                    fill="#DFE5E7"
                    d="M105.946.25C164.318.25 211.64 47.596 211.64 106s-47.322 105.75-105.695 105.75C47.571 211.75.25 164.404.25 106S47.571.25 105.946.25z"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M61.543 100.988c8.073 0 14.246-6.174 14.246-14.246s-6.173-14.246-14.246-14.246-14.246 6.173-14.246 14.246 6.174 14.246 14.246 14.246zm8.159 17.541a48.192 48.192 0 0 1 8.545-6.062c-4.174-2.217-9.641-3.859-16.704-3.859-21.844 0-28.492 15.67-28.492 15.67v8.073h26.181l.105-.248c.303-.713 3.164-7.151 10.365-13.574zm80.755-9.921c-6.854 0-12.21 1.543-16.336 3.661a48.223 48.223 0 0 1 8.903 6.26c7.201 6.422 10.061 12.861 10.364 13.574l.105.248h25.456v-8.073c-.001 0-6.649-15.67-28.492-15.67zm0-7.62c8.073 0 14.246-6.174 14.246-14.246s-6.173-14.246-14.246-14.246-14.246 6.173-14.246 14.246 6.173 14.246 14.246 14.246zm-44.093 3.21a23.21 23.21 0 0 0 4.464-.428c.717-.14 1.419-.315 2.106-.521 1.03-.309 2.023-.69 2.976-1.138a21.099 21.099 0 0 0 3.574-2.133 20.872 20.872 0 0 0 5.515-6.091 21.283 21.283 0 0 0 2.121-4.823 22.16 22.16 0 0 0 .706-3.193c.16-1.097.242-2.224.242-3.377s-.083-2.281-.242-3.377a22.778 22.778 0 0 0-.706-3.193 21.283 21.283 0 0 0-3.272-6.55 20.848 20.848 0 0 0-4.364-4.364 21.099 21.099 0 0 0-3.574-2.133 21.488 21.488 0 0 0-2.976-1.138 22.33 22.33 0 0 0-2.106-.521 23.202 23.202 0 0 0-4.464-.428c-12.299 0-21.705 9.405-21.705 21.704 0 12.299 9.406 21.704 21.705 21.704zM145.629 131a36.739 36.739 0 0 0-1.2-1.718 39.804 39.804 0 0 0-3.367-3.967 41.481 41.481 0 0 0-3.442-3.179 42.078 42.078 0 0 0-5.931-4.083 43.725 43.725 0 0 0-3.476-1.776c-.036-.016-.069-.034-.104-.05-5.692-2.581-12.849-4.376-21.746-4.376-8.898 0-16.055 1.795-21.746 4.376-.196.089-.379.185-.572.276a43.316 43.316 0 0 0-3.62 1.917 42.32 42.32 0 0 0-5.318 3.716 41.501 41.501 0 0 0-3.443 3.179 40.632 40.632 0 0 0-3.366 3.967c-.452.61-.851 1.186-1.2 1.718-.324.493-.6.943-.841 1.351l-.061.101a27.96 27.96 0 0 0-.622 1.119c-.325.621-.475.975-.475.975v11.692h82.53v-11.692s-.36-.842-1.158-2.195a35.417 35.417 0 0 0-.842-1.351z"
                  ></path>
                </svg>
              </div>
            </div>
          )}

          <div className={s.info}>
            <div
              style={
                editName
                  ? {
                      borderBottom: "2px solid #00af9c",
                      marginBottom: 2,
                    }
                  : {}
              }
              className={s.infoSub}
            >
              <input
                value={newName}
                disabled={!editName}
                onChange={(e: any) => setNewName(e.target.value)}
                type="text"
              />
              <div className={s.editNameButton}>
                {editName && <small>{25 - newName.length ?? 0}</small>}
                {editName ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="20"
                    height="20"
                  >
                    <path
                      fill="currentColor"
                      d="M9.5 1.7C4.8 1.7 1 5.5 1 10.2s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5zm0 15.9c-4.1 0-7.4-3.3-7.4-7.4s3.3-7.4 7.4-7.4 7.4 3.3 7.4 7.4-3.3 7.4-7.4 7.4z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M6.8 9.8c.7-.1 1.2-.7 1.1-1.4-.1-.6-.5-1.1-1.1-1.1-.7 0-1.2.7-1.1 1.4 0 .6.5 1 1.1 1.1zM13.9 11.6c-1.4.2-2.9.3-4.4.4-1.5 0-2.9-.1-4.4-.4-.2 0-.4.1-.4.3v.2c.9 1.8 2.7 2.9 4.7 3 2-.1 3.8-1.2 4.8-3 .1-.2 0-.4-.1-.5h-.2zm-4.1 2c-2.3 0-3.5-.8-3.7-1.4 2.3.4 4.6.4 6.9 0 0 .1-.4 1.4-3.2 1.4zM12.2 9.8c.7-.1 1.2-.7 1.1-1.4-.1-.6-.5-1.1-1.1-1.1-.7 0-1.2.7-1.1 1.4.1.6.5 1 1.1 1.1z"
                    ></path>
                  </svg>
                ) : null}
                {editName ? (
                  <svg
                    onClick={handleNameUpdate}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"
                    ></path>
                  </svg>
                ) : otherFriend ? null : (
                  <svg
                    onClick={() => setEditName(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
            {otherFriend ? null : <small>Created 1/4/2021 at 12:04 AM</small>}
          </div>
        </div>
      </div>
    );
  }
);

export const AddNewAvatar = ({ type, handleDropMenuClicks }: any) => {
  return (
    <div onClick={handleDropMenuClicks} className={s.addGroupIcon}>
      <div className={s.addGroupCameraDiv}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="currentColor"
            d="M21.317 4.381H10.971L9.078 2.45c-.246-.251-.736-.457-1.089-.457H4.905c-.352 0-.837.211-1.078.468L1.201 5.272C.96 5.529.763 6.028.763 6.38v1.878l-.002.01v11.189a1.92 1.92 0 0 0 1.921 1.921h18.634a1.92 1.92 0 0 0 1.921-1.921V6.302a1.92 1.92 0 0 0-1.92-1.921zM12.076 18.51a5.577 5.577 0 1 1 0-11.154 5.577 5.577 0 0 1 0 11.154zm0-9.506a3.929 3.929 0 1 0 0 7.858 3.929 3.929 0 0 0 0-7.858z"
          ></path>
        </svg>
        {type === "change" && <p>CHANGE GROUP ICON</p>}
        {type === "add" && <p>ADD GROUP ICON</p>}
      </div>
    </div>
  );
};
