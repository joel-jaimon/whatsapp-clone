import { useContext } from "react";
import s from "../globalModalStyles.module.scss";
import { globalModalContext } from "../../../context/globalModalContext";

export const DeniedMicrophone = () => {
  const { setModal } = useContext(globalModalContext);

  return (
    <div className={s.accessDenied}>
      <h3>Allow microphone</h3>
      <p>
        To record audio, WhatsApp needs access to your computer's microphone.
        Click in the URL bar and choose “Always allow web.whatsapp.com to access
        your microphone.”
      </p>
      <div className={s.controlFooter}>
        <button onClick={() => setModal(null)} className={s.coloredBtn}>
          OK, GOT IT
        </button>
      </div>
    </div>
  );
};
