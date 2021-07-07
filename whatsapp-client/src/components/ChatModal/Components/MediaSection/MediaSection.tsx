import s from "./mediaSection.module.scss";

export const MediaSection = () => {
  return (
    <div className={s.mediaScreen}>
      <div className={s.head}>
        <p className="chatModalSectionTitle">Media, Links and Docs</p>
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
      <div className={s.mediaThumbnails}></div>
    </div>
  );
};
