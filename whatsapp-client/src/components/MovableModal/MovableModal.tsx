import { useContext } from "react";
import { movalbleModalContext } from "../../context/movableModalContext";
import { MinimizedVideo } from "./Components/MinimizedVideo";
import s from "./movableModal.module.scss";

const Modal = ({ type, params }: any) => {
  console.log(type, params);
  switch (type) {
    case "minimizedVideo":
      return <MinimizedVideo params={params} />;
    default:
      return <div />;
  }
};

export const MovableModal = () => {
  const { movableModal }: any = useContext(movalbleModalContext);
  console.log(movableModal);
  return (
    <div className={s.movableModal}>
      <Modal {...movableModal} />
    </div>
  );
};
