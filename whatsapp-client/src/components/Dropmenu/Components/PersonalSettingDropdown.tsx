// import s from "../sidebarStyles.module.scss";
import { connect } from "react-redux";
import { DropdownAnimation } from "animations/dropdown/DropdownAnimation";
import s from "./dropmenu.module.scss";

const passStateToProps = ({ dropDownMenu }: any) => ({
  dropMenu: dropDownMenu.dropDown,
});

export const PersonalSettingDropdown = connect(passStateToProps)(
  ({ dropMenu, fixedDropdown }: any) => {
    const sizeParam = {
      height: 205,
      width: 140,
      yOffset: 0,
      xOffset: 142,
    };
    return (
      <DropdownAnimation
        sizeParam={sizeParam}
        locationParams={dropMenu.position}
        className={s.dropDown}
        fixedDropdown={true}
      >
        <div className={s.list}>
          <p>New group</p>
        </div>
        <div className={s.list}>
          <p>Create a room</p>
        </div>
        <div className={s.list}>
          <p>Profile</p>
        </div>
        <div className={s.list}>
          <p>Starred</p>
        </div>
        <div className={s.list}>
          <p>Settings</p>
        </div>
        <div className={s.list}>
          <p>Logout</p>
        </div>
      </DropdownAnimation>
    );
  }
);
