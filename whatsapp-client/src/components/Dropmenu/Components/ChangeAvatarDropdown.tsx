import s from "./dropmenu.module.scss";
import { connect } from "react-redux";
import { setDropDown } from "../../../redux/actions/setDropDown";
import { setGlobalModal } from "../../../redux/actions/setGlobalModal";

const passStateToProps = ({ dropDownMenu }: any) => ({
    dropMenu: dropDownMenu.dropDown,
});

const passDispatchToProps = (dispatch: any) => ({
    setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
    setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
});

export const ChangeAvatarDropdown = connect(
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

    const viewPhoto = () => {
        setGlobalModal({
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
});
