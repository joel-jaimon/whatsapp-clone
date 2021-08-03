import s from "./dropmenu.module.scss";
import { connect } from "react-redux";

const passStateToProps = ({ dropDownMenu }: any) => ({
    dropMenu: dropDownMenu.dropDown,
});

export const ActiveChatInfo = connect(passStateToProps)(({ dropMenu }: any) => {
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
                <p>Info</p>
            </div>
            <div className={s.list}>
                <p>Select messages</p>
            </div>
            <div className={s.list}>
                <p>Mute notifications</p>
            </div>
            <div className={s.list}>
                <p>Clear messages</p>
            </div>
            <div className={s.list}>
                <p>Delete chat</p>
            </div>
        </div>
    );
});
