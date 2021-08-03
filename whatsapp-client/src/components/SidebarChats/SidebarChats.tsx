import { Avatar } from "@material-ui/core";
import s from "./chatStyles.module.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import { setDropDown } from "../../redux/actions/setDropDown";

const passDispatchToProps = (dispatch: any) => ({
    setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
});

export const SidebarChats = connect(
    null,
    passDispatchToProps
)(({ data, setDropMenu }: any) => {
    const handleDropMenuClicks = (e: any, type: string) => {
        setDropMenu({
            type,
            position: {
                x: e.clientX,
                y: e.clientY,
            },
            params: {},
        });
    };

    return (
        <div
            onClickCapture={() => setDropMenu(false)}
            onContextMenu={(e) => {
                e.preventDefault();
                setDropMenu({
                    type: "chatInfo",
                    position: {
                        x: e.clientX,
                        y: e.clientY,
                    },
                    params: {},
                });
            }}
            className={s.sidebarChats}
        >
            <Avatar />
            <span className={s.chatInfo}>
                <div>
                    <p>{data.name}</p>
                    <p className={s.time}>Thursday</p>
                </div>
                <div>
                    <small>
                        Ipsom: Askjdh askjd aks dkjas kd aksjd hkasjdhkas dkjas
                        kdjha skdj hkasjd kasj kdjash kdj hkasjhd k askdj aks jd
                    </small>
                    <ExpandMoreIcon
                        onClick={(e) => handleDropMenuClicks(e, "chatInfo")}
                        style={{
                            height: 20,
                            color: "rgb(130, 134, 137)",
                        }}
                    />
                </div>
            </span>
        </div>
    );
});
