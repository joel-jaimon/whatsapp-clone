import s from "./room.module.scss";
import { RoomFooter } from "./Footer/RoomFooter";
import { RoomHeader } from "./Header/RoomHeader";
import { RoomMain } from "./Main/RoomMain";
import { connect } from "react-redux";

const passStateToProps = ({ roomModal }: any) => ({
    roomModal: roomModal?.modal,
});

export const RoomModal = connect(passStateToProps)(({ roomModal }: any) => {
    return roomModal ? (
        <div className={s.smoke}>
            <div className={s.fullModal}>
                <div className={s.room}>
                    <div className={s.mainPanel}>
                        <RoomHeader />
                        <RoomMain />
                        <RoomFooter />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div />
    );
});
