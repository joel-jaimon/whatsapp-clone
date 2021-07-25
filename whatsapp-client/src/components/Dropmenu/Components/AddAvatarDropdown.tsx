import { useContext } from "react";
import { dropDownContext } from "../../../context/dropDownContext";
import { globalModalContext } from "../../../context/globalModalContext";
import s from "./dropmenu.module.scss";

export const AddAvatarDropdown = () => {
  const { dropMenu }: any = useContext(dropDownContext);
  const { setModal }: any = useContext(globalModalContext);
  return (
    <div
      className={s.dropDown}
      style={{
        position: "absolute",
        left: dropMenu.position.x + 2,
        top: dropMenu.position.y + 2,
        zIndex: 20,
      }}
    >
      <div
        onClick={() =>
          setModal({
            type: "allowCamera",
            params: dropMenu.params,
          })
        }
        className={s.list}
      >
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
    </div>
  );
};
