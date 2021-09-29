import s from "./sidebarStyles.module.scss";
import { SidebarChats } from "../SidebarChats/SidebarChats";
import { SidebarHead } from "../SidebarHead/SidebarHead";
import { SidebarSearch } from "../SidebarSearch/SidebarSearch";
import { SidebarModal } from "../SidebarModal/SidebarModal";
import { connect } from "react-redux";
import { SidebarChatSkeletons } from "skeletons/SidebarChatSkeletons";

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
        {chatState.loading
          ? [1, 2, 3].map((e) => {
              return <SidebarChatSkeletons />;
            })
          : Object.entries(chatState.chat).map(([id, data]: any) => {
              return <SidebarChats key={id} data={data} />;
            })}
      </div>
    </div>
  );
});
