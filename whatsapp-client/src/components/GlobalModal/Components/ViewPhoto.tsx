import s from "../globalModalStyles.module.scss";
import { connect } from "react-redux";
import { setGlobalModal } from "redux/reducers/globalModal";

const passStateToProps = ({ globalModal }: any) => ({
  globalModal: globalModal.modal,
});

const passDispatchToProps = (dispatch: any) => ({
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
});

export const ViewPhoto = connect(
  passStateToProps,
  passDispatchToProps
)(({ globalModal, setGlobalModal }: any) => {
  return (
    <div className={s.showPhoto}>
      <div className={s.header}>
        <span className={s.info}>
          <img src={globalModal.params.src} alt="img" />
          <p>Profile 2</p>
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            setGlobalModal(null);
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
        <img className={s.photo} src={globalModal.params.src} />
      </div>
      <div />
    </div>
  );
});
