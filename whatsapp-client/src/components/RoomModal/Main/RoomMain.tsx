import { useEffect, useState } from "react";
import s from "./main.module.scss";
import { MyVideo } from "./Video/MyVideo";

export const RoomMain = () => {
  const [videos, setVideos] = useState<any>({});
  return (
    <div className={s.roomMain}>
      <MyVideo key={"MyVideo"} videos={videos} setVideos={setVideos} />
      {Object.entries(videos).map((e: any) => {
        return e[1];
      })}
    </div>
  );
};
