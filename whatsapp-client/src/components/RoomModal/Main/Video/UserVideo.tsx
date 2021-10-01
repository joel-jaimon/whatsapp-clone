import {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { setGlobalModal } from "redux/reducers/globalModal";
import s from "./uservideo.module.scss";

const passStateToProps = ({ globalModal, roomModal }: any) => ({
  globalModal: globalModal.modal,
  room: roomModal.modal,
});

const passDispatchToProps = (dispatch: any) => ({
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
});

export const UserVideo = connect(
  passStateToProps,
  passDispatchToProps
)(({ stream }: any) => {
  const videoRef: MutableRefObject<HTMLVideoElement | null | undefined> =
    useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    videoRef.current!.onloadeddata = () => {
      videoRef.current?.play();
      setLoading(false);
    };
    videoRef.current!.srcObject = stream;
  }, []);

  return (
    <div className={s.userVideo}>
      <div className={s.video}>
        <div className={s.smokeControl}>
          {loading ? (
            <div className={s.loading}>
              <svg
                version="1.0"
                width="40px"
                height="40px"
                viewBox="0 0 128 128"
              >
                <path
                  fill="#00af9c"
                  d="M64.4 16a49 49 0 0 0-50 48 51 51 0 0 0 50 52.2 53 53 0 0 0 54-52c-.7-48-45-55.7-45-55.7s45.3 3.8 49 55.6c.8 32-24.8 59.5-58 60.2-33 .8-61.4-25.7-62-60C1.3 29.8 28.8.6 64.3 0c0 0 8.5 0 8.7 8.4 0 8-8.6 7.6-8.6 7.6z"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 64 64"
                    to="360 64 64"
                    dur="600ms"
                    repeatCount="indefinite"
                  ></animateTransform>
                </path>
              </svg>
            </div>
          ) : null}
        </div>
        <video ref={videoRef as LegacyRef<HTMLVideoElement> | undefined} />
      </div>
    </div>
  );
});
