import { connect } from "react-redux";
import { DropdownAnimation } from "animations/dropdown/DropdownAnimation";
import { setDropDown } from "redux/reducers/dropDown";
import { setGlobalModal } from "redux/reducers/globalModal";
import s from "./dropmenu.module.scss";

const passStateToProps = ({ dropDownMenu }: any) => ({
  dropMenu: dropDownMenu.dropDown,
});

const passDispatchToProps = (dispatch: any) => ({
  setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
});

export const AddAvatarDropdown = connect(
  passStateToProps,
  passDispatchToProps
)(({ dropMenu, setDropMenu, setGlobalModal }: any) => {
  const takePhoto = () => {
    if (localStorage.getItem("_streamPermission")) {
      setGlobalModal({
        type: "takePhoto",
        params: dropMenu.params,
      });
    } else {
      setGlobalModal({
        type: "allowCamera",
        params: dropMenu.params,
      });
    }
    setDropMenu("");
  };

  const sizeParam = {
    height: 68,
    width: 140,
    yOffset: 73,
    xOffset: 142,
  };
  return (
    <DropdownAnimation
      sizeParam={sizeParam}
      locationParams={dropMenu.position}
      className={s.dropDown}
    >
      <div onClick={takePhoto} className={s.list}>
        <p>Take photo</p>
      </div>
      <div className={s.list}>
        <input
          type="file"
          accept="image/png"
          onChange={(e: any) =>
            dropMenu.params.handleAvatarChange(e.target.files[0])
          }
        />
        <p>Upload photo</p>
      </div>
    </DropdownAnimation>
  );
});
