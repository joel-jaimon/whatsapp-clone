import s from "./footer.module.scss";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import CallEndIcon from "@material-ui/icons/CallEnd";
import {
  disconnectFromCall,
  toggleAudio,
  toggleVideo,
} from "redux/reducers/roomModal";
import { connect } from "react-redux";

const passStateToProps = ({ roomModal }: any) => ({
  micStatus: roomModal.micStatus,
  videoStatus: roomModal.videoStatus,
});

const passDispatchToProps = (dispatch: any) => ({
  disconnectFromCall: () => dispatch(disconnectFromCall()),
  toggleVideo: (payload: boolean) => dispatch(toggleVideo(payload)),
  toggleAudio: (payload: boolean) => dispatch(toggleAudio(payload)),
});

export const RoomFooter = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    toggleAudio,
    micStatus,
    videoStatus,
    disconnectFromCall,
    toggleVideo,
  }: any) => {
    return (
      <div className={s.roomFooter}>
        {micStatus ? (
          <MicIcon onClick={() => toggleAudio(false)} className={s.Icon} />
        ) : (
          <MicOffIcon
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
            onClick={() => toggleAudio(true)}
            className={s.Icon}
          />
        )}
        {videoStatus ? (
          <VideocamIcon onClick={() => toggleVideo(false)} className={s.Icon} />
        ) : (
          <VideocamOffIcon
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
            onClick={() => toggleVideo(true)}
            className={s.Icon}
          />
        )}
        <CallEndIcon
          onClick={disconnectFromCall}
          className={`${s.Icon} ${s.endCallBtn}`}
        />
      </div>
    );
  }
);
