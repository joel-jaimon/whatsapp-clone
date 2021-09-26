import s from "./sidebarHeadStyles.module.scss";
import { connect } from "react-redux";
import { setDropDown } from "redux/reducers/dropDown";
import { setSidebarModal } from "redux/reducers/sidebarChatModal";
// import { setAuthState } from "redux/reducers/auth";

const passDispatchToProps = (dispatch: any) => ({
  setPersonalSettingsDropdown: (dropDown: any) =>
    dispatch(setDropDown(dropDown)),
  setSidebarModal: (sidebarModal: any) =>
    dispatch(setSidebarModal(sidebarModal)),
  // setAuthUser: (auth: any) => dispatch(setAuthState(auth)),
});

const passStateToProps = ({ dropDownMenu, authState }: any) => ({
  dropDown: dropDownMenu.dropDown,
  authState: authState.auth,
});

export const SidebarHead = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    authState,
    dropDown,
    setPersonalSettingsDropdown,
    setSidebarModal,
  }: any) => {
    const toggleDropdown = (e: any) => {
      if (dropDown.type === "personalSetting") {
        setPersonalSettingsDropdown({
          type: "",
        });
      } else {
        setPersonalSettingsDropdown({
          type: "personalSetting",
          position: {
            x: e.target.getBoundingClientRect().left - 110,
            y: e.target.getBoundingClientRect().top + 34,
          },
          params: {},
        });
      }
    };

    return (
      <div className={s.sidebarHead}>
        <span
          onClick={() => {
            setSidebarModal({
              type: "userSidebar",
              params: {
                headerTitle: "Profile",
              },
            });
          }}
          className={s.avatar}
        >
          {authState.avatar ? (
            <img src={authState.avatar} alt="" />
          ) : (
            <div className={s.mainIcon}>
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            </div>
          )}
        </span>
        <div className={s.headControls}>
          <span className="icons">
            <svg
              id="ee51d023-7db6-4950-baf7-c34874b80976"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
              ></path>
            </svg>
          </span>
          <span
            onClick={() => {
              setSidebarModal({
                type: "newMsgSidebar",
                params: {
                  headerTitle: "New Chat",
                },
              });
            }}
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
                d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
              ></path>
            </svg>
          </span>
          <span
            style={
              dropDown.type === "personalSetting"
                ? {
                    backgroundColor: "#292929",
                  }
                : {}
            }
            onClick={toggleDropdown}
            className={`icons ${s.dropDownBtn}`}
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
