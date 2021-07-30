import s from "../movableModal.module.scss";
import { useContext, useRef, useState } from "react";
import CropFreeIcon from "@material-ui/icons/CropFree";
import CloseIcon from "@material-ui/icons/Close";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

// Volume
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import { movalbleModalContext } from "../../../context/movableModalContext";

const VolumeButton = ({ vol }: { vol: number }) => {
    if (vol < 1) return <VolumeOffIcon />;
    if (vol <= 30) return <VolumeMuteIcon />;
    if (vol <= 70) return <VolumeDownIcon />;
    if (vol <= 100) return <VolumeUpIcon />;
    return <div />;
};

export const MinimizedVideo = ({ params }: any) => {
    const [duration, setDuration] = useState<any>(null);
    const [play, setPlay] = useState(false);
    const [currentTime, setCurrentTime] = useState<any>(0);
    const [vol, setVol] = useState(100);
    const { setMovableModal } = useContext(movalbleModalContext);

    const videoRef: any = useRef(null);
    const animationRef: any = useRef(null);
    const progressbarRef: any = useRef(null);
    const volProgressRef: any = useRef(null);

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
        if (play) {
            videoRef.current.pause();
            setPlay(false);
            cancelAnimationFrame(animationRef.current);
        } else {
            videoRef.current.play();
            setPlay(true);
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
    };

    const whilePlaying = () => {
        progressbarRef.current.value = videoRef.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    };

    const changeRange = () => {
        videoRef.current.currentTime = progressbarRef.current.value;
        changePlayerCurrentTime();
    };

    const changePlayerCurrentTime = () => {
        progressbarRef.current.style.setProperty(
            "--seek-before-width",
            `${(progressbarRef.current.value / duration) * 100}%`
        );
        setCurrentTime(progressbarRef.current.value);
    };

    const changeVolume = () => {
        const vol = volProgressRef.current.value;
        videoRef.current.volume = vol / 100;
        volProgressRef.current.style.setProperty(
            "--seek-before-width",
            `${vol}%`
        );
        setVol(vol);
    };

    return (
        <div className={s.minimizedVideo}>
            <div className={s.control}>
                <div className={s.header}>
                    <CropFreeIcon />
                    <CloseIcon onClick={() => setMovableModal(null)} />
                </div>
                <div className={s.footer}>
                    <div className={s.controlBtn}>
                        <button onClick={handleAudioState}>
                            {play ? <PauseIcon /> : <PlayArrowIcon />}
                        </button>
                    </div>
                    <input
                        onMouseOver={(e) => console.log(e)}
                        onChange={changeRange}
                        defaultValue="0"
                        ref={progressbarRef}
                        type="range"
                    />
                    <div className={s.volController}>
                        <div className={s.volTrack}>
                            <input
                                onChange={changeVolume}
                                defaultValue={100}
                                ref={volProgressRef}
                                type="range"
                                max={100}
                                min={0}
                                className={s.progressBar}
                            />
                        </div>
                        <button>{<VolumeButton vol={vol} />}</button>
                    </div>
                </div>
            </div>
            <video
                ref={videoRef}
                src={params.src}
                onDurationChange={(e) => loadDuration(e.target)}
            />
        </div>
    );
};
