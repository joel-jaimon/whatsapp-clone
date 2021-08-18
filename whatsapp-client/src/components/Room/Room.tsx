import s from "./room.module.scss";
import { RoomFooter } from "./Footer/RoomFooter";
import { RoomHeader } from "./Header/RoomHeader";
import { RoomMain } from "./Main/RoomMain";
import { RightPanel } from "./RightPanel/RightPanel";

export const Room = () => {
    return (
        <div className={s.roomWrapper}>
            <div className={s.room}>
                <div className={s.mainPanel}>
                    <RoomHeader />
                    <RoomMain />
                    <RoomFooter />
                </div>
                <div className={s.rightPanel}>
                    <RightPanel />
                </div>
            </div>
        </div>
    );
};
