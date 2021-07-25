import { useContext } from "react";
import { globalModalContext } from "../../context/globalModalContext";
import { RemoveAvatar } from "./Components/RemoveAvatar";
import { AllowCamera } from "./Components/AllowCamera";
import { DeniedCamera } from "./Components/DeniedCamera";
import { TakePhoto } from "./Components/TakePhoto";
import s from "./globalModalStyles.module.scss";

const Modal = ({ type }: any) => {
  switch (type) {
    case "removeAvatar":
      return <RemoveAvatar />;
    case "allowCamera":
      return <AllowCamera />;
    case "cameraDenied":
      return <DeniedCamera />;
    case "takePhoto":
      return <TakePhoto />;
    default:
      return <div />;
  }
};

export const GlobalModal = () => {
  const { modal }: any = useContext(globalModalContext);
  return (
    modal && (
      <div className={s.smoke}>
        <div className={modal.type === "allowCamera" ? s.allowCamera : s.modal}>
          <Modal type={modal.type} />
        </div>
      </div>
    )
  );
};
