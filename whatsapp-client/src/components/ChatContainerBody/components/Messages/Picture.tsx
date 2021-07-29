import s from "./messages.module.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";

export const Picture = ({ type, src }: any) => {
  const [imageOrientation, setImageOrientation] = useState<any>(null);
  const handleImageType = (e: any) => {
    if (e.target.naturalHeight > e.target.naturalWidth) {
      setImageOrientation("potrait");
    } else {
      setImageOrientation("landscape");
    }
  };
  return (
    <span className={type === "right" ? s.imgRight : s.imgLeft}>
      <div className={s.img}>
        <div
          className={
            imageOrientation === "potrait" ? s.imgPotrait : s.imgLandscape
          }
        >
          <div className={s.smoke}>
            <ExpandMoreIcon />
          </div>
          <img src={src} alt="file-thumbnail" onLoad={handleImageType} />
        </div>
      </div>
    </span>
  );
};
