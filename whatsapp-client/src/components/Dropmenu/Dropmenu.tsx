import { ActiveChatInfo } from "./Components/ActiveChatInfo";
import { AddAvatarDropdown } from "./Components/AddAvatarDropdown";
import { ChangeAvatarDropdown } from "./Components/ChangeAvatarDropdown";
import { ChatInfoDropdown } from "./Components/ChatInfoDropdown";
import { connect } from "react-redux";

const passStateToProps = ({ dropDownMenu }: any) => ({
    dropMenu: dropDownMenu.dropDown,
});

export const DropMenu = connect(passStateToProps)(({ dropMenu }: any) => {
    switch (dropMenu.type) {
        case "addAvatar":
            return <AddAvatarDropdown />;
        case "changeAvatar":
            return <ChangeAvatarDropdown />;
        case "chatInfo":
            return <ChatInfoDropdown />;
        case "activeChatInfo":
            return <ActiveChatInfo />;
        default:
            return (
                <div
                    style={{
                        display: "none",
                    }}
                />
            );
    }
});
