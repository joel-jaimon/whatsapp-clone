import s from "../globalModalStyles.module.scss";

export const MultipleSession = () => {
  return (
    <div className={s.removeAvatar}>
      <p>
        WhatsApp Clone is open in another window. Click "Use Here" to use in
        this window.
      </p>
      <div className={s.controlFooter}>
        <button
          onClick={() => window.location.reload()}
          className={s.coloredBtn}
        >
          USE HERE
        </button>
      </div>
    </div>
  );
};
