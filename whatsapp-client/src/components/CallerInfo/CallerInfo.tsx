import { connect } from "react-redux";
import { callConnected, rejectCall } from "redux/reducers/callerInfo";
import s from "./callerInfo.module.scss";
import CallEndIcon from "@material-ui/icons/CallEnd";
import VideocamIcon from "@material-ui/icons/Videocam";
import { setRoomModal } from "redux/reducers/roomModal";
import { CallerInfoAnimation } from "animations/CallerInfoAnimation";
import { useState } from "react";

const passStateToProps = ({ roomState }: any) => ({
  callerInfo: roomState.callerInfo,
});

const passDispatchToProps = (dispatch: any) => ({
  rejectCall: (payload: any) => dispatch(rejectCall(payload)),
  callConnected: (payload: any) => dispatch(callConnected(payload)),
  setRoomModal: (payload: any) => dispatch(setRoomModal(payload)),
});

export const CallerInfo = connect(
  passStateToProps,
  passDispatchToProps
)(({ callerInfo, setRoomModal, rejectCall, callConnected }: any) => {
  const [reverseAttachmentModalAnimation, setReverseAttachmentModalAnimation] =
    useState(false);

  const onClose = () => {
    if (reverseAttachmentModalAnimation) {
      rejectCall();
      setReverseAttachmentModalAnimation(false);
    }
  };

  const acceptCall = () => {
    setRoomModal({
      peerId: callerInfo.peerId,
      callBy: null,
      groupInfo: [],
      acceptedCall: true,
    });
    callConnected();
  };
  //
  return callerInfo?.active ? (
    <CallerInfoAnimation
      onClose={onClose}
      reverse={reverseAttachmentModalAnimation}
      className={s.callerInfo}
    >
      <div className={s.eva}>
        <div
          className={s.img}
          style={{
            background: `linear-gradient(transparent, rgb(21,21,21)), url(${callerInfo?.avatar})`,
            backgroundSize: "cover",
          }}
        />
        <div className={s.foo}>
          <img className={s.avr} src={callerInfo?.avatar} alt="-" />
          <p>{callerInfo?.displayName}</p>
          <div className={s.bee}>
            <span>
              <VideocamIcon onClick={acceptCall} />
            </span>
            <span>
              <CallEndIcon />
            </span>
          </div>
        </div>
      </div>
    </CallerInfoAnimation>
  ) : null;
});
