import { Avatar } from "@material-ui/core";
import s from "./chatStyles.module.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import { setDropDown } from "../../redux/actions/setDropDown";
import { setActiveChat } from "../../redux/actions/activeChat";
import { setChatContainerModal } from "../../redux/actions/chatContainerModal";
import { MsgPreview } from "./Components/MsgPreview";

const passStateToProps = ({ activeChat }: any) => ({
    activeChat: activeChat.chat,
});

const passDispatchToProps = (dispatch: any) => ({
    setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
    setActiveChat: (activeChat: any) => dispatch(setActiveChat(activeChat)),
    setChatModal: (chatModal: any) =>
        dispatch(setChatContainerModal(chatModal)),
});

export const SidebarChats = connect(
    passStateToProps,
    passDispatchToProps
)(({ data, setDropMenu, setActiveChat, setChatModal }: any) => {
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

    const handleActiveChat = () => {
        setDropMenu(false);
        setChatModal(null);
        setActiveChat({
            chatInfo: data,
            messages: require(`../../data/temp/chats/data/${data.id}.json`),
        });
    };

    return (
        <div
            onClickCapture={handleActiveChat}
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
            <Avatar src={data.avatar} alt="sidebar-chat-avatar" />
            <span className={s.chatInfo}>
                <div>
                    <p>{data.name}</p>
                    <p className={s.time}>Thursday</p>
                </div>
                <div>
                    <MsgPreview {...data} />
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
