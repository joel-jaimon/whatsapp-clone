import { connect } from "react-redux";
import s from "./dropmenu.module.scss";

const passStateToProps = ({ dropDownMenu }: any) => ({
    dropMenu: dropDownMenu.dropDown,
});

export const ChatInfoDropdown = connect(passStateToProps)(
    ({ dropMenu }: any) => {
        return (
            <div
                style={{
                    position: "absolute",
                    left: dropMenu.position.x + 2,
                    top: dropMenu.position.y + 2,
                    zIndex: 200,
                }}
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
            </div>
        );
    }
);
