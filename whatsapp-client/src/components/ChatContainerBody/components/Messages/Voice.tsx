import { useRef, useState } from "react";
import s from "./messages.module.scss";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import MicIcon from "@material-ui/icons/Mic";
import { formatTime } from "../../../../utils/formatTime";
import { getDuration } from "../../../../utils/parseDuration";
import { SeenStats } from "../../../SeenStats/SeenStats";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Voice = ({
  msgPosition,
  timestamp,
  msgParams,
  extraParam,
  stillSending,
}: any) => {
  const [audioState, setAudioState] = useState(false);
  const [currentTime, setCurrentTime] = useState<any>(0);

  const audioRef: any = useRef(null);
  const animationRef: any = useRef(null);
  const progressbarRef: any = useRef(null);

  const handleAudioState = () => {
    if (audioState) {
      audioRef.current.pause();
      setAudioState(false);
      cancelAnimationFrame(animationRef.current);
    } else {
      audioRef.current.play();
      setAudioState(true);
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const whilePlaying = () => {
    progressbarRef.current.value = audioRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioRef.current.currentTime = progressbarRef.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressbarRef.current.style.setProperty(
      "--seek-before-width",
      `${(progressbarRef.current.value / msgParams.duration) * 100}%`
    );
    setCurrentTime(progressbarRef.current.value);
  };

  const handleEnd = () => {
    setAudioState(false);
    cancelAnimationFrame(animationRef.current);
  };

  return (
    <span className={msgPosition === "right" ? s.voiceRight : s.voiceLeft}>
      <div className={s.voice}>
        <div className={s.userImg}>
          {stillSending && <CircularProgress className={s.icon} size={30} />}
          <img src={extraParam.byAvatar} alt="user-info" />

          <MicIcon className={s.micIcon} />
          <audio ref={audioRef} src={msgParams.url} onEnded={handleEnd} />
        </div>

        <div className={s.audioInfo}>
          <button disabled={stillSending} onClick={handleAudioState}>
            {!audioState ? <PlayArrowIcon /> : <PauseIcon />}
          </button>
          <div>
            <input
              onChange={changeRange}
              defaultValue="0"
              ref={progressbarRef}
              type="range"
              disabled={stillSending}
              max={msgParams.duration}
              min={0}
              className={s.progressBar}
            />
            <div className={s.audioTrack}>
              <small>{getDuration(msgParams.duration)}</small>
              <small>{currentTime ? getDuration(currentTime) : null}</small>

              {extraParam.owner ? (
                <div className={s._A}>
                  <small>{formatTime(timestamp)}</small>
                  <SeenStats type={stillSending ? -1 : extraParam.seenStatus} />
                </div>
              ) : (
                <small>{formatTime(timestamp)}</small>
              )}
            </div>
          </div>
        </div>
      </div>
    </span>
  );
};
