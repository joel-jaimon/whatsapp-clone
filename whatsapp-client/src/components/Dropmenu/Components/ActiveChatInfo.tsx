import { useContext } from "react";
import { dropDownContext } from "../../../context/dropDownContext";
import s from "./dropmenu.module.scss";

export const ActiveChatInfo = () => {
    const { dropMenu, setDropMenu }: any = useContext(dropDownContext);
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
};
