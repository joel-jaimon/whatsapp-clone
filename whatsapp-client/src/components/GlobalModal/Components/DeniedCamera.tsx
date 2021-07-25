import { useContext } from "react";
import s from "../globalModalStyles.module.scss";
import { globalModalContext } from "../../../context/globalModalContext";

export const DeniedCamera = () => {
  const { modal, setModal } = useContext(globalModalContext);

  return (
    <div className={s.accessDenied}>
      <h3>Allow camera</h3>
      <p>
        To take photos, WhatsApp needs access to your computer's camera. Click
        in the URL bar and choose “Always allow web.whatsapp.com to access your
        camera.”
      </p>
      <div className={s.controlFooter}>
        <button onClick={() => setModal(null)} className={s.coloredBtn}>
          OK, GOT IT
        </button>
      </div>
    </div>
  );
};
