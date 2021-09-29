import { useEffect, useState } from "react";
import s from "./main.module.scss";
import { MyVideo } from "./Video/MyVideo";

export const RoomMain = () => {
  const [videos, setVideos] = useState<any>([]);

  useEffect(() => {
    setVideos([<MyVideo setVideos={setVideos} />]);
  }, []);

  return (
    <div className={s.roomMain}>
      {videos.map((e: any) => {
        return e;
      })}
    </div>
  );
};
