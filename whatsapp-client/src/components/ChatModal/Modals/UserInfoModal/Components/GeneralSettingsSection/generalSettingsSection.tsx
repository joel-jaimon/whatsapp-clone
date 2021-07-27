import s from "./generalStyles.module.scss";

export const GeneralSettingsSection = () => {
  return (
    <div className={s.basicSettings}>
      <div className={s.settings}>
        <p>Mute Notifications</p>
        <input type="checkbox" />
      </div>
      <div className={s.settings}>
        <p>Starred Messages</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 21"
          width="10"
          height="21"
        >
          <path
            fill="currentColor"
            d="M1 15.75l5.2-5.2L1 5.35l1.5-1.5 6.5 6.7-6.6 6.6-1.4-1.4z"
          ></path>
        </svg>
      </div>
      <div className={s.settings}>
        <div className={s.disMsg}>
          <p>Disappearing Messages</p>
          <small>Off</small>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 21"
          width="10"
          height="21"
        >
          <path
            fill="currentColor"
            d="M1 15.75l5.2-5.2L1 5.35l1.5-1.5 6.5 6.7-6.6 6.6-1.4-1.4z"
          ></path>
        </svg>
      </div>
      <div className={s.settings}>
        <p>Group Settings</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 21"
          width="10"
          height="21"
        >
          <path
            fill="currentColor"
            d="M1 15.75l5.2-5.2L1 5.35l1.5-1.5 6.5 6.7-6.6 6.6-1.4-1.4z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
