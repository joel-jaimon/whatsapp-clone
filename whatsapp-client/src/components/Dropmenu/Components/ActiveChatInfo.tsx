import s from "./dropmenu.module.scss";
import { connect } from "react-redux";
import { useRef } from "react";

const passStateToProps = ({ dropDownMenu }: any) => ({
    dropMenu: dropDownMenu.dropDown,
});

export const ActiveChatInfo = connect(passStateToProps)(({ dropMenu }: any) => {
    const dropDownRef = useRef(null);

    return (
        <div
            ref={dropDownRef}
            style={{
                position: "absolute",
                left:
                    dropMenu.position.x + 142 > window.innerWidth
                        ? dropMenu.position.x - 142
                        : dropMenu.position.x + 2,
                top:
                    dropMenu.position.y + 175 > window.innerHeight
                        ? dropMenu.position.y - 175
                        : dropMenu.position.y + 2,
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
