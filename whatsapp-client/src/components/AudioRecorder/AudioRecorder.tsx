import { useEffect } from "react";
import { connect } from "react-redux";
import { setGlobalModal } from "../../redux/reducers/globalModal";
import s from "./audioRecorder.module.scss";

const passDispatchToProps = (dispatch: any) => ({
    setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
});

export const AudioRecorder = connect(
    null,
    passDispatchToProps
)(({ closeOption, setGlobalModal }: any) => {
    useEffect(() => {
        if (!localStorage.getItem("_microphoneAccess"))
            setGlobalModal({
                type: "allowMicrophone",
                params: {},
            });
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
            })
            .then((stream) => {
                localStorage.setItem("_microphoneAccess", "allowed");
                setGlobalModal(null);
            })
            .catch((err) => {
                setGlobalModal({
                    type: "microphoneDenied",
                    params: {},
                });
                closeOption(true);
            });
    }, []);

    return (
        <div className={s.recorderActive}>
            <svg
                onClick={() => closeOption(true)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path
                    fillRule="evenodd"
                    d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"
                />
            </svg>
            <p>0:00</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
        </div>
    );
});
