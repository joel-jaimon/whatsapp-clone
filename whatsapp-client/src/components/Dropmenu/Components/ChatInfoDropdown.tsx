import { connect } from "react-redux";
import { DropdownAnimation } from "animations/dropdown/DropdownAnimation";
import s from "./dropmenu.module.scss";

const passStateToProps = ({ dropDownMenu }: any) => ({
  dropMenu: dropDownMenu.dropDown,
});

export const ChatInfoDropdown = connect(passStateToProps)(
  ({ dropMenu }: any) => {
    const sizeParam = {
      height: 170,
      width: 140,
      yOffset: 175,
      xOffset: 142,
    };
    return (
      <DropdownAnimation
        sizeParam={sizeParam}
        locationParams={dropMenu.position}
        className={s.dropDown}
      >
        <div className={s.list}>
          <p>Archive chat</p>
        </div>
        <div className={s.list}>
          <p>Mute notification</p>
        </div>
        <div className={s.list}>
          <p>Exit group</p>
        </div>
        <div className={s.list}>
          <p>Unpin chat</p>
        </div>
        <div className={s.list}>
          <p>Mark as unread</p>
        </div>
      </DropdownAnimation>
    );
  }
);
