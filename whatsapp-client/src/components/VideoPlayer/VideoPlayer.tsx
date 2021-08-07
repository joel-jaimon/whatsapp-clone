import s from "./videoPlayer.module.scss";
import { useRef, useState } from "react";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import CropFreeIcon from "@material-ui/icons/CropFree";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

const VolumeButton = ({ vol }: { vol: number }) => {
    if (vol < 1) return <VolumeOffIcon />;
    if (vol <= 30) return <VolumeMuteIcon />;
    if (vol <= 70) return <VolumeDownIcon />;
    if (vol <= 100) return <VolumeUpIcon />;
    return <div />;
};

export const VideoPlayer = ({ src }: any) => {
    const [duration, setDuration] = useState<any>(null);
    const [play, setPlay] = useState(false);
    const [control, setControl] = useState(false);
    const [vol, setVol] = useState(100);
    const [volVisible, setVolVisible] = useState(false);

    const videoRef: any = useRef(null);
    const animationRef: any = useRef(null);
    const progressbarRef: any = useRef(null);
    const volProgressRef: any = useRef(null);

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
        try {
            progressbarRef.current.value = videoRef.current?.currentTime;
            changePlayerCurrentTime();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } catch {
            if (animationRef.current)
                cancelAnimationFrame(animationRef.current);
        }
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

    const fullScreenMode = () => {
        videoRef.current.requestFullscreen();
    };

    return (
        <div
            onMouseEnter={() => setControl(true)}
            onMouseLeave={() => setControl(false)}
            className={s.minimizedVideo}
        >
            <div
                style={{
                    opacity: control ? 1 : 0,
                }}
                className={s.control}
            >
                <div className={s.header}>
                    <CropFreeIcon onClick={fullScreenMode} />
                </div>
                <div className={s.footer}>
                    <div className={s.controlBtn}>
                        <button onClick={handleAudioState}>
                            {play ? <PauseIcon /> : <PlayArrowIcon />}
                        </button>
                    </div>
                    <input
                        onChange={changeRange}
                        defaultValue="0"
                        ref={progressbarRef}
                        type="range"
                    />
                    <div
                        onMouseLeave={() => setVolVisible(false)}
                        onMouseEnter={() => setVolVisible(true)}
                        className={s.volController}
                    >
                        {volVisible ? (
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
                        ) : null}
                        <button>{<VolumeButton vol={vol} />}</button>
                    </div>
                </div>
            </div>
            <video
                ref={videoRef}
                src={src}
                onEnded={(e) => setPlay(false)}
                onDurationChange={(e) => loadDuration(e.target)}
            />
        </div>
    );
};
