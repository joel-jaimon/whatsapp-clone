import { connect } from "react-redux";
import { MovableModalAnimation } from "animations/movableModal/MovableModalAnimation";
import { MinimizedVideo } from "./Components/MinimizedVideo";
import s from "./movableModal.module.scss";

const Modal = ({ type, params }: any) => {
  switch (type) {
    case "minimizedVideo":
      return params.orientation === "potrait" ? (
        <div className={s.minVidWrapperPotrait}>
          <MinimizedVideo params={params} />
        </div>
      ) : (
        <div className={s.minVidWrapperLandscape}>
          <MinimizedVideo params={params} />
        </div>
      );
    default:
      return <div />;
  }
};

const passStateToProps = ({ movableModal }: any) => ({
  movableModal: movableModal.modal,
});

export const MovableModal = connect(passStateToProps)(
  ({ movableModal }: any) => {
    return (
      <MovableModalAnimation
        movableModal={movableModal}
        className={s.movableModal}
      >
        <Modal {...movableModal} />
      </MovableModalAnimation>
    );
  }
);
