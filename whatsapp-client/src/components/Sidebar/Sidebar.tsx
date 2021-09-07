import s from "./sidebarStyles.module.scss";
import { SidebarChats } from "../SidebarChats/SidebarChats";
import { SidebarHead } from "../SidebarHead/SidebarHead";
import { SidebarSearch } from "../SidebarSearch/SidebarSearch";
import { SidebarModal } from "../SidebarModal/SidebarModal";
import { connect } from "react-redux";

const passStateToProps = ({ chatState }: any) => ({
  chatState,
});

export const Sidebar = connect(passStateToProps)(({ chatState }: any) => {
  return (
    <div className={s.sidebar}>
      <SidebarModal />
      <SidebarHead />
      <SidebarSearch />
      <div className={s.chatsContainer}>
        {Object.entries(chatState.chat).map(([id, { chatInfo }]: any) => {
          return <SidebarChats key={id} data={chatInfo} />;
        })}
      </div>
    </div>
  );
});
