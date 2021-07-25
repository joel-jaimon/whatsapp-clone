import s from "../globalModalStyles.module.scss";

export const DeniedCamera = () => {
  return (
    <div>
      <h3>Allow camera</h3>
      <p>
        To take photos, WhatsApp needs access to your computer's camera. Click
        in the URL bar and choose “Always allow web.whatsapp.com to access your
        camera.”
      </p>
      <div className={s.controlFooter}>
        <button className={s.coloredBtn}>OK, GOT IT</button>
      </div>
    </div>
  );
};
