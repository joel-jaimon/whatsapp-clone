import s from "./messages.module.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useContext, useState } from "react";
import { globalModalContext } from "../../../../context/globalModalContext";

export const Picture = ({ type, src }: any) => {
    const [imageOrientation, setImageOrientation] = useState<any>(null);
    const { setModal } = useContext(globalModalContext);
    const handleImageType = (e: any) => {
        if (e.target.naturalHeight > e.target.naturalWidth) {
            setImageOrientation("potrait");
        } else {
            setImageOrientation("landscape");
        }
    };

    const preview = () => {
        setModal({
            type: "viewMsgPreview",
            params: { src },
        });
    };
    return (
        <span className={type === "right" ? s.imgRight : s.imgLeft}>
            <div className={s.img}>
                <div
                    className={
                        imageOrientation === "potrait"
                            ? s.imgPotrait
                            : s.imgLandscape
                    }
                >
                    <div onClick={preview} className={s.smoke}>
                        <ExpandMoreIcon />
                    </div>
                    <img
                        src={src}
                        alt="file-thumbnail"
                        onLoad={handleImageType}
                    />
                </div>
            </div>
        </span>
    );
};
