import s from "../globalModalStyles.module.scss";

export const AllowCamera = () => {
  return (
    <div className={s.allowCameraB}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="currentColor"
            d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"
          ></path>
        </svg>
      </span>
      <span>
        <p className={s.allowCamText}>Allow camera</p>
        <p className={s.allowCamPara}>
          To take photos, click "Allow" above to give WhatsApp access to <br />
          your computer's camera.
        </p>
        <button className={s.coloredBtn}>OK, GOT IT</button>
      </span>
    </div>
  );
};
