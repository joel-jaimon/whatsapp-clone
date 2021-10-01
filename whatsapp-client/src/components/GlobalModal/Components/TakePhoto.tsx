import { useRef, useEffect, useState } from "react";
import s from "../globalModalStyles.module.scss";
import { setGlobalModal } from "redux/reducers/globalModal";
import { connect } from "react-redux";

const passStateToProps = ({ globalModal }: any) => ({
  globalModal: globalModal.modal,
});

const passDispatchToProps = (dispatch: any) => ({
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
});

export const TakePhoto = connect(
  passStateToProps,
  passDispatchToProps
)(({ globalModal, setGlobalModal }: any) => {
  const videoRef: any = useRef(null);
  const canvaRef: any = useRef(null);
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getStream = () => {
    setLoading(true);
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setLoading(false);
      })
      .catch((e) => {
        if (e.message === "Permission denied") {
          setGlobalModal({
            type: "cameraDenied",
            params: {},
          });
        }
      });
  };

  const takepicture = async () => {
    var context = canvaRef.current.getContext("2d");
    const width = 400;
    const height = 300;
    if (width && height) {
      canvaRef.current.width = width;
      canvaRef.current.height = height;
      context.drawImage(videoRef.current, 0, 0, width, height);

      var data = canvaRef.current.toDataURL("image/png");
      canvaRef.current.setAttribute("src", data);
      setPhoto(data);
      await stopStream();
    } else {
      //Asd
    }
  };

  const handleRetake = () => {
    setPhoto(null);
    getStream();
  };

  const finalizeTakenPic = () => {
    // Convert base64 to blob
    fetch(photo)
      .then((res) => res.blob())
      .then((e) => {
        if (globalModal.params?.viaFooter) {
          globalModal.params.send(e);
        } else {
          globalModal.params.handleAvatarChange(e);
        }
        setGlobalModal(null);
      });
  };

  const stopStream = async () => {
    await videoRef.current.srcObject.getTracks().forEach((track: any) => {
      track.stop();
    });
    videoRef.current.srcObject = null;
  };

  const closeModal = async () => {
    await stopStream();
    setGlobalModal(null);
  };

  useEffect(() => {
    getStream();
  }, []);

  return (
    <div className={s.takeAvatarModal}>
      {loading ? (
        <div className={s.loading}>
          <svg version="1.0" width="40px" height="40px" viewBox="0 0 128 128">
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
      <div
        style={{
          display: photo ? "none" : "unset",
        }}
        className={`${s.takePhoto}`}
      >
        {loading ? null : (
          <div className={s.header}>
            <svg
              onClick={closeModal}
              style={{
                cursor: "pointer",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"
              ></path>
            </svg>

            <span>Take photo</span>
          </div>
        )}
        <div>
          <video ref={videoRef} />
        </div>
        {loading ? null : (
          <div className={s.footer}>
            <span onClick={takepicture}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M21.317 4.381H10.971L9.078 2.45c-.246-.251-.736-.457-1.089-.457H4.905c-.352 0-.837.211-1.078.468L1.201 5.272C.96 5.529.763 6.028.763 6.38v1.878l-.002.01v11.189a1.92 1.92 0 0 0 1.921 1.921h18.634a1.92 1.92 0 0 0 1.921-1.921V6.302a1.92 1.92 0 0 0-1.92-1.921zM12.076 18.51a5.577 5.577 0 1 1 0-11.154 5.577 5.577 0 0 1 0 11.154zm0-9.506a3.929 3.929 0 1 0 0 7.858 3.929 3.929 0 0 0 0-7.858z"
                ></path>
              </svg>
            </span>
          </div>
        )}
      </div>
      <div
        style={{
          display: photo ? "unset" : "none",
        }}
        className={`${s.viewTakenPhoto}`}
      >
        <div className={s.Theader}>
          <div className={s.header}>
            <svg
              onClick={closeModal}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"
              ></path>
            </svg>

            <span>Drag the image to adjust</span>
          </div>
          <div className={s.retakeBtn}>
            <button onClick={handleRetake}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M19.77 11.73c0 1.64-.5 2.95-1.48 3.89-1.38 1.32-3.26 1.41-3.75 1.41H9.01v-2.1h5.46c.05 0 1.47.04 2.38-.84.55-.53.82-1.32.82-2.37 0-1.27-.33-2.23-.99-2.84-.98-.92-2.43-.85-2.44-.85h-4.23v3.1L4 7.07 10.01 3v2.93h4.16c.03 0 2.29-.13 3.95 1.42 1.09 1.03 1.65 2.5 1.65 4.38z"
                ></path>
              </svg>
              Retake
            </button>
          </div>
        </div>
        <div>
          <canvas ref={canvaRef} />
        </div>
        <div className={s.footer}>
          <span onClick={finalizeTakenPic}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="30"
              height="30"
            >
              <path
                fill="currentColor"
                d="M9.9 21.25l-6.7-6.7-2.2 2.2 8.9 8.9L29 6.55l-2.2-2.2-16.9 16.9z"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
});
