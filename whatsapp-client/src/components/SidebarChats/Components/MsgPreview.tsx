import { Doc } from "./Doc";
import { Picture } from "./Picture";
import { Text } from "./Text";
import { Video } from "./Video";
import { Voice } from "./Voice";

export const MsgPreview = (props: any) => {
    const chats = require(`../../../data/temp/chats/data/${props.id}.json`)[0];
    switch (chats.msgType) {
        case "text":
            return <Text {...chats} />;
        case "document":
            return <Doc {...chats} />;
        case "image":
            return <Picture {...chats} />;
        case "voice":
            return <Voice {...chats} />;
        case "video":
            return <Video {...chats} />;
        default:
            return <div />;
    }
};
