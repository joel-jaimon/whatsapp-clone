import { useContext } from "react";
import { globalModalContext } from "../../context/globalModalContext";
import { RemoveAvatar } from "./Components/RemoveAvatar";
import { AllowCamera } from "./Components/AllowCamera";
import { DeniedCamera } from "./Components/DeniedCamera";
import { TakePhoto } from "./Components/TakePhoto";
import { ViewPhoto } from "./Components/ViewPhoto";
import { AllowMicrophone } from "./Components/AllowMicrophone";
import s from "./globalModalStyles.module.scss";
import { DeniedMicrophone } from "./Components/DeniedMicrophone";

const Modal = ({ type }: any) => {
  switch (type) {
    case "removeAvatar":
      return <RemoveAvatar />;
    case "allowCamera":
      return <AllowCamera />;
    case "allowMicrophone":
      return <AllowMicrophone />;
    case "cameraDenied":
      return <DeniedCamera />;
    case "microphoneDenied":
      return <DeniedMicrophone />;
    case "takePhoto":
      return <TakePhoto />;
    case "viewPhoto":
      return <ViewPhoto />;
    default:
      return <div />;
  }
};

const fullModal = ["viewPhoto"];
const transparentModal = ["allowMicrophone", "allowCamera"];

export const GlobalModal = () => {
  const { modal }: any = useContext(globalModalContext);
  return (
    modal && (
      <div className={s.smoke}>
        {fullModal.includes(modal.type) ? (
          <div className={s.fullModal}>
            <Modal type={modal.type} />
          </div>
        ) : (
          <div
            className={
              transparentModal.includes(modal.type) ? s.allowCamera : s.modal
            }
          >
            <Modal type={modal.type} />
          </div>
        )}
      </div>
    )
  );
};