import { useContext } from "react";
import { globalModalContext } from "../../context/globalModalContext";
import { RemoveAvatar } from "./Components/RemoveAvatar";
import s from "./globalModalStyles.module.scss";

const Modal = ({ type }: any) => {
  switch (type) {
    case "removeAvatar":
      return <RemoveAvatar />;
    default:
      return <div />;
  }
};

export const GlobalModal = () => {
  const { modal }: any = useContext(globalModalContext);
  return (
    modal && (
      <div className={s.smoke}>
        <div className={s.modal}>
          <Modal type={modal.type} />
        </div>
      </div>
    )
  );
};
