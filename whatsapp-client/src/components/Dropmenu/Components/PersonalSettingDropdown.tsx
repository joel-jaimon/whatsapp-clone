// import s from "../sidebarStyles.module.scss";
import { connect } from "react-redux";
import s from "./dropmenu.module.scss";

const passStateToProps = ({ dropDownMenu }: any) => ({
    dropMenu: dropDownMenu.dropDown,
});

export const PersonalSettingDropdown = connect(passStateToProps)(
    ({ dropMenu }: any) => {
        return (
            <div
                style={{
                    position: "absolute",
                    left:
                        dropMenu.position.x + 142 > window.innerWidth
                            ? dropMenu.position.x - 142
                            : dropMenu.position.x + 2,
                    top: dropMenu.position.y + 2,
                    zIndex: 200,
                }}
                className={s.dropDown}
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
            </div>
        );
    }
);
