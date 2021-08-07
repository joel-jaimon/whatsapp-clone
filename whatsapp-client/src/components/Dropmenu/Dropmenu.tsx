import { ActiveChatInfo } from "./Components/ActiveChatInfo";
import { AddAvatarDropdown } from "./Components/AddAvatarDropdown";
import { ChangeAvatarDropdown } from "./Components/ChangeAvatarDropdown";
import { ChatInfoDropdown } from "./Components/ChatInfoDropdown";
import { connect } from "react-redux";
import { PersonalSettingDropdown } from "./Components/PersonalSettingDropdown";

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
        case "activeChatInfoToggle":
            return <ActiveChatInfo fixedDropdown={true} />;
        case "activeChatInfo":
            return <ActiveChatInfo />;
        case "personalSetting":
            return <PersonalSettingDropdown />;
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
