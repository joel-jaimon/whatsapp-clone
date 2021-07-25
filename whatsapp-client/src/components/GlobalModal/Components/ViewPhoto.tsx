import s from "../globalModalStyles.module.scss";
import { useContext } from "react";
import { globalModalContext } from "../../../context/globalModalContext";

export const ViewPhoto = () => {
  const { modal, setModal }: any = useContext(globalModalContext);

  return (
    <div className={s.showPhoto}>
      <div className={s.header}>
        <span className={s.info}>
          <img src={modal.params.src} />
          <p>Profile 2</p>
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            setModal(null);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M19.8 5.8l-1.6-1.6-6.2 6.2-6.2-6.2-1.6 1.6 6.2 6.2-6.2 6.2 1.6 1.6 6.2-6.2 6.2 6.2 1.6-1.6-6.2-6.2 6.2-6.2z"
            ></path>
          </svg>
        </span>
      </div>
      <div className={s.photoContainer}>
        <img className={s.photo} src={modal.params.src} />
      </div>
      <div />
    </div>
  );
};
