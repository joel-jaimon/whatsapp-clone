import { useContext } from "react";
import { globalModalContext } from "../../../context/globalModalContext";
import s from "../globalModalStyles.module.scss";

export const RemoveAvatar = () => {
  const { modal, setModal }: any = useContext(globalModalContext);
  return (
    <div className={s.removeAvatar}>
      <p>Remove this group's icon?</p>
      <div className={s.controlFooter}>
        <button onClick={() => setModal(null)} className={s.borderBtn}>
          CANCEL
        </button>
        <button onClick={modal.params.removeAvatar} className={s.coloredBtn}>
          REMOVE
        </button>
      </div>
    </div>
  );
};
