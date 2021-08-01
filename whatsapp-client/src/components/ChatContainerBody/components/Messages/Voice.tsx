import { useEffect, useRef, useState } from "react";
import s from "./messages.module.scss";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import MicIcon from "@material-ui/icons/Mic";
import { formatTime } from "../../../../utils/formatTime";

export const Voice = ({ msgPosition, timestamp }: any) => {
    const [duration, setDuration] = useState<any>(null);
    const [audioState, setAudioState] = useState(false);
    const [currentTime, setCurrentTime] = useState<any>(0);

    const audioRef: any = useRef(null);
    const animationRef: any = useRef(null);
    const progressbarRef: any = useRef(null);

    const getDuration = (secs: number) => {
        const seconds = Math.floor(secs % 60);
        const minutes = Math.floor(secs / 60);
        const formatedMins = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formatedSecs = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formatedMins}:${formatedSecs}`;
    };

    const loadDuration = ({ duration }: any) => {
        if (duration) {
            setDuration(Math.floor(duration));
            progressbarRef.current.max = Math.floor(duration);
        }
    };

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
            `${(progressbarRef.current.value / duration) * 100}%`
        );
        setCurrentTime(progressbarRef.current.value);
    };

    return (
        <span className={msgPosition === "right" ? s.voiceRight : s.voiceLeft}>
            <div className={s.voice}>
                <div className={s.userImg}>
                    <img
                        src="https://i.pravatar.cc/150?img=19"
                        alt="user-info"
                    />
                    <MicIcon />
                    <audio
                        ref={audioRef}
                        onDurationChange={(e) => loadDuration(e.target)}
                        src={
                            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                        }
                    />
                </div>

                <div className={s.audioInfo}>
                    <button onClick={handleAudioState}>
                        {!audioState ? <PlayArrowIcon /> : <PauseIcon />}
                    </button>
                    <div>
                        <input
                            onChange={changeRange}
                            defaultValue="0"
                            ref={progressbarRef}
                            type="range"
                            className={s.progressBar}
                        />
                        <div className={s.audioTrack}>
                            <small>
                                {duration ? getDuration(duration) : null}
                            </small>
                            <small>
                                {currentTime ? getDuration(currentTime) : null}
                            </small>
                            <small>{formatTime(timestamp)}</small>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    );
};
