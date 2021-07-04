import { Avatar } from "@material-ui/core";
import s from "./chatStyles.module.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const SidebarChats = () => {
  return (
    <>
      <div className={s.sidebarChats}>
        <Avatar />
        <span className={s.chatInfo}>
          <div>
            <p>Wibein</p>
            <p className={s.time}>Thursday</p>
          </div>
          <div>
            <small>Bhavna: Pagal hai adrij</small>
            <ExpandMoreIcon
              style={{
                height: 20,
                color: "rgb(130, 134, 137)",
              }}
            />
          </div>
        </span>
      </div>
      <div className={s.sidebarChats}>
        <Avatar />
        <span className={s.chatInfo}>
          <div>
            <p>Wibein</p>
            <p className={s.time}>Thursday</p>
          </div>
          <div>
            <small>
              Bhavna: Pagal hai adrij askjdh askjd aks dkjas kd aksjd hkasjdhkas
              dkjas kdjha skdj hkasjd kasj kdjash kdj hkasjhd k askdj aks jd
            </small>
            <ExpandMoreIcon
              style={{
                height: 20,
                color: "rgb(130, 134, 137)",
              }}
            />
          </div>
        </span>
      </div>
    </>
  );
};
