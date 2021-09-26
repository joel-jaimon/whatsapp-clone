import s from "../globalModalStyles.module.scss";
import { connect } from "react-redux";
import { setGlobalModal } from "redux/reducers/globalModal";

const passStateToProps = ({ globalModal }: any) => ({
  globalModal: globalModal.modal,
});

const passDispatchToProps = (dispatch: any) => ({
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
});

export const RemoveAvatar = connect(
  passStateToProps,
  passDispatchToProps
)(({ globalModal, setGlobalModal }: any) => {
  return (
    <div className={s.removeAvatar}>
      <p>Remove this group's icon?</p>
      <div className={s.controlFooter}>
        <button onClick={() => setGlobalModal(null)} className={s.borderBtn}>
          CANCEL
        </button>
        <button
          onClick={globalModal.params.removeAvatar}
          className={s.coloredBtn}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
});
