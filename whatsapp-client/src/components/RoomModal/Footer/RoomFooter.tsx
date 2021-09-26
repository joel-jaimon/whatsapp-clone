import s from "./footer.module.scss";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import CallEndIcon from "@material-ui/icons/CallEnd";
import { useState } from "react";
import { setRoomModal } from "redux/reducers/roomModal";
import { connect } from "react-redux";

const passDispatchToProps = (dispatch: any) => ({
  setRoomModal: (payload: any) => dispatch(setRoomModal(payload)),
});

export const RoomFooter = connect(
  null,
  passDispatchToProps
)(({ setRoomModal }: any) => {
  const [mic, setMic] = useState(false);
  const [video, setVideo] = useState(false);

  return (
    <div className={s.roomFooter}>
      {mic ? (
        <MicIcon onClick={() => setMic(false)} className={s.Icon} />
      ) : (
        <MicOffIcon onClick={() => setMic(true)} className={s.Icon} />
      )}
      {video ? (
        <VideocamIcon onClick={() => setVideo(false)} className={s.Icon} />
      ) : (
        <VideocamOffIcon onClick={() => setVideo(true)} className={s.Icon} />
      )}
      <CallEndIcon
        onClick={() => setRoomModal(null)}
        className={`${s.Icon} ${s.endCallBtn}`}
      />
    </div>
  );
});
