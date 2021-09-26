import { useState } from "react";
import { connect } from "react-redux";
import { initAuthuserInfoUpdate, initiateLogout } from "redux/reducers/auth";
import { AddNewAvatar } from "components/ChatModal/Modals/UserInfoModal/Components/AvatarSection/AvatarSection";
import s from "../sidebarModal.module.scss";
import compress from "react-image-file-resizer";
import { setDropDown } from "redux/reducers/dropDown";
import { setGlobalModal } from "redux/reducers/globalModal";

const passStateToProps = ({ authState, dropDownMenu }: any) => ({
  dropMenu: dropDownMenu.dropDown,
  authState: authState.auth,
});

const passDispatchToProps = (dispatch: any) => ({
  setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
  initiateLogout: () => dispatch(initiateLogout()),
  initAuthuserInfoUpdate: (payload: any) =>
    dispatch(initAuthuserInfoUpdate(payload)),
});

export const UserSidebar = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    initiateLogout,
    authState,
    setDropMenu,
    setGlobalModal,
    dropMenu,
    initAuthuserInfoUpdate,
  }: any) => {
    const [editName, setEditName] = useState(false);
    const [newName, setNewName] = useState(authState.displayName);
    const [editBioBool, setEditBio] = useState(false);
    const [newBio, setNewBio] = useState(authState.about);
    const [hoverForNewAvatar, setHoverForNewAvatar] = useState(false);

    const handleDescUpdate = () => {
      initAuthuserInfoUpdate({
        about: newBio,
      });
      setEditBio(false);
    };

    const handleNameUpdate = () => {
      initAuthuserInfoUpdate({
        displayName: newName,
      });
      setEditName(false);
    };

    const handleCompressedImage = (base64Data: string) => {
      initAuthuserInfoUpdate({
        avatar: base64Data,
      });
      setDropMenu("");
    };

    const handleRemoveImage = () => {
      setGlobalModal({
        type: "removeAvatar",
        params: {
          removeAvatar: () => {
            initAuthuserInfoUpdate({
              avatar: null,
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
          src: type === "changeAvatar" ? authState.avatar : null,
        },
      });
    };

    return (
      <div className={s.sidebarModalBody}>
        {authState?.avatar ? (
          <div
            onMouseLeave={() => setHoverForNewAvatar(false)}
            onMouseOver={() => setHoverForNewAvatar(true)}
            className={s.userImage}
          >
            {/* @ts-ignore */}
            {(hoverForNewAvatar || dropMenu?.type === "changeAvatar") && (
              <AddNewAvatar
                handleAvatarChange={handleAvatarChange}
                handleDropMenuClicks={(e: any) =>
                  handleDropMenuClicks(e, "changeAvatar")
                }
                type="change"
              />
            )}
            <img src={authState.avatar} alt="user-img" />
          </div>
        ) : (
          <div className={s.userImage}>
            <AddNewAvatar
              type="add"
              handleDropMenuClicks={(e: any) =>
                handleDropMenuClicks(e, "addAvatar")
              }
              handleAvatarChange={handleAvatarChange}
            />
            <div className={s.mainIcon}>
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            </div>
          </div>
        )}

        <div className={s.section}>
          <small>Your Name</small>
          <div
            style={
              editName
                ? {
                    borderBottom: "2px solid #00af9c",
                    marginBottom: 2,
                  }
                : {}
            }
            className={`${s.infoSub}`}
          >
            <input
              value={newName}
              disabled={!editName || authState.authType === "guest"}
              onChange={(e: any) => setNewName(e.target.value)}
              type="text"
            />
            {authState.authType !== "guest" ? (
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
                ) : (
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
            ) : null}
          </div>
        </div>
        <p className={s.info}>
          This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </p>
        <div className={s.section}>
          <small>About</small>
          <div
            style={
              editBioBool
                ? {
                    borderBottom: "2px solid #00af9c",
                    marginBottom: 2,
                  }
                : {}
            }
            className={s.infoSub}
          >
            <span
              className={s.input}
              onPaste={(e: any) => e.preventDefault()}
              onDrag={(e: any) => e.preventDefault()}
              onDrop={(e: any) => e.preventDefault()}
              contentEditable={editBioBool && authState.authType !== "guest"}
              onInput={(e: any) => {
                try {
                  setNewBio(e.target.outerText);
                  var selection: any = window.getSelection();
                  var range = document.createRange();
                  selection.removeAllRanges();
                  range.selectNodeContents(e.target);
                  range.collapse(false);
                  selection.addRange(range);
                  e.target.focus();
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              {newBio}
            </span>

            {authState.authType !== "guest" ? (
              <div className={s.editNameButton}>
                {editBioBool ? (
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
                {editBioBool ? (
                  <svg
                    onClick={handleDescUpdate}
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
                ) : (
                  <svg
                    onClick={() => setEditBio(true)}
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
            ) : null}
          </div>
        </div>
        <button onClick={() => initiateLogout()} className={s.logoutBtn}>
          Logout
        </button>
      </div>
    );
  }
);
