import { useContext } from "react";
import { dropDownContext } from "../../../context/dropDownContext";
import s from "./dropmenu.module.scss";

export const ChatInfoDropdown = ({ type }: any) => {
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
};
