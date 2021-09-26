import { connect } from "react-redux";
import { setGlobalModal } from "redux/reducers/globalModal";
import s from "../globalModalStyles.module.scss";

const passDispatchToProps = (dispatch: any) => ({
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
});

export const DeniedMicrophone = connect(
  null,
  passDispatchToProps
)(({ setGlobalModal }: any) => {
  return (
    <div className={s.accessDenied}>
      <h3>Allow microphone</h3>
      <p>
        To record audio, WhatsApp needs access to your computer's microphone.
        Click in the URL bar and choose “Always allow web.whatsapp.com to access
        your microphone.”
      </p>
      <div className={s.controlFooter}>
        <button onClick={() => setGlobalModal(null)} className={s.coloredBtn}>
          OK, GOT IT
        </button>
      </div>
    </div>
  );
});
