import s from "./sidebarStyles.module.scss";
import chats from "../../data/temp/chats/chats.json";
import { SidebarChats } from "../SidebarChats/SidebarChats";
import { SidebarHead } from "../SidebarHead/SidebarHead";
import { SidebarSearch } from "../SidebarSearch/SidebarSearch";
import { SidebarModal } from "../SidebarModal/SidebarModal";

export const Sidebar = () => {
    return (
        <div className={s.sidebar}>
            <SidebarModal />
            <SidebarHead />
            <SidebarSearch />
            <div className={s.chatsContainer}>
                {chats.map((e, i) => {
                    return <SidebarChats key={i} data={e} />;
                })}
            </div>
        </div>
    );
};
