import { connect } from "react-redux";
import { rejectCall } from "redux/reducers/room";
import s from "./callerInfo.module.scss";
import CallEndIcon from "@material-ui/icons/CallEnd";
import VideocamIcon from "@material-ui/icons/Videocam";

const passStateToProps = ({ roomState }: any) => ({
  callerInfo: roomState.callerInfo,
});

const passDispatchToProps = (dispatch: any) => ({
  rejectCall: (payload: any) => dispatch(rejectCall(payload)),
});

export const CallerInfo = connect(
  passStateToProps,
  passDispatchToProps
)(({ callerInfo }: any) => {
  return callerInfo?.active ? (
    <div className={s.callerInfo}>
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
              <VideocamIcon />
            </span>
            <span>
              <CallEndIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
});
