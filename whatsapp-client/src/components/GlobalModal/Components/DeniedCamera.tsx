import s from "../globalModalStyles.module.scss";
import { connect } from "react-redux";
import { setGlobalModal } from "redux/reducers/globalModal";

const passDispatchToProps = (dispatch: any) => ({
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
});

export const DeniedCamera = connect(
  null,
  passDispatchToProps
)(({ setGlobalModal }: any) => {
  return (
    <div className={s.accessDenied}>
      <h3>Allow camera</h3>
      <p>
        To take photos, WhatsApp needs access to your computer's camera. Click
        in the URL bar and choose “Always allow web.whatsapp.com to access your
        camera.”
      </p>
      <div className={s.controlFooter}>
        <button onClick={() => setGlobalModal(null)} className={s.coloredBtn}>
          OK, GOT IT
        </button>
      </div>
    </div>
  );
});
