import { useContext } from "react";
import { globalModalContext } from "../../../context/globalModalContext";
import { dropDownContext } from "../../../context/dropDownContext";
import s from "./dropmenu.module.scss";

export const ChangeAvatarDropdown = () => {
  const { dropMenu, setDropMenu }: any = useContext(dropDownContext);
  const { setModal }: any = useContext(globalModalContext);

  const takePhoto = () => {
    if (localStorage.getItem("_streamPermission")) {
      setModal({
        type: "takePhoto",
        params: dropMenu.params,
      });
    } else {
      setModal({
        type: "allowCamera",
        params: dropMenu.params,
      });
    }
    setDropMenu("");
  };

  const viewPhoto = () => {
    setModal({
      type: "viewPhoto",
      params: dropMenu.params,
    });
    setDropMenu("");
  };

  return (
    <div
      className={s.dropDown}
      style={{
        position: "absolute",
        left: dropMenu.position.x + 2,
        top: dropMenu.position.y + 2,
        zIndex: 200,
      }}
    >
      <div onClick={viewPhoto} className={s.list}>
        <p>View photo</p>
      </div>
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
      <div onClick={dropMenu.params.handleRemoveImage} className={s.list}>
        <p>Remove photo</p>
      </div>
    </div>
  );
};
