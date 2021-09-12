import { Doc } from "./Doc";
import { Picture } from "./Picture";
import { Text } from "./Text";
import { Video } from "./Video";
import { Voice } from "./Voice";

export const MsgPreview = (props: any) => {
  switch (props.msgType) {
    case "text":
      return <Text {...props} />;
    case "document":
      return <Doc {...props} />;
    case "image":
      return <Picture {...props} />;
    case "voice":
      return <Voice {...props} />;
    case "video":
      return <Video {...props} />;
    default:
      return <div />;
  }
};
