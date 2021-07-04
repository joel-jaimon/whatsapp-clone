import { SidebarChats } from "../SidebarChats/SidebarChats";
import { SidebarHead } from "../SidebarHead/SidebarHead";
import { SidebarSearch } from "../SidebarSearch/SidebarSearch";
import s from "./sidebarStyles.module.scss";

export const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      <SidebarHead />
      <SidebarSearch />
      <div className={s.chatsContainer}>
        {[...new Array(200)].map((e, i) => {
          return <SidebarChats key={i} />;
        })}
      </div>
    </div>
  );
};
