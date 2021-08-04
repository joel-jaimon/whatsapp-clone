import s from "../movableModal.module.scss";
import { useRef, useState } from "react";
import CropFreeIcon from "@material-ui/icons/CropFree";
import CloseIcon from "@material-ui/icons/Close";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

// Volume
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import {
    landscapeOffset,
    potraitOffset,
} from "../../../constants/movableModal";
import { connect } from "react-redux";
import { setMovableModal } from "../../../redux/actions/movalbleModal";
import { setGlobalModal } from "../../../redux/actions/setGlobalModal";

const VolumeButton = ({ vol }: { vol: number }) => {
    if (vol < 1) return <VolumeOffIcon />;
    if (vol <= 30) return <VolumeMuteIcon />;
    if (vol <= 70) return <VolumeDownIcon />;
    if (vol <= 100) return <VolumeUpIcon />;
    return <div />;
};

const passDispatchToProps = (dispatch: any) => ({
    setMovableModal: (modal: any) => dispatch(setMovableModal(modal)),
    setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
});

export const MinimizedVideo = connect(
    null,
    passDispatchToProps
)(({ params, setGlobalModal, setMovableModal }: any) => {
    const [duration, setDuration] = useState<any>(null);
    const [play, setPlay] = useState(false);
    const [currentTime, setCurrentTime] = useState<any>(0);
    const [vol, setVol] = useState(100);
    const [volVisible, setVolVisible] = useState(false);

    const videoRef: any = useRef(null);
    const animationRef: any = useRef(null);
    const progressbarRef: any = useRef(null);
    const volProgressRef: any = useRef(null);

    const offset =
        params.orientation === "potrait" ? potraitOffset : landscapeOffset;

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
        progressbarRef.current.value = videoRef.current?.currentTime;
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

    const openMinimizedVideo = () => {
        setMovableModal({
            type: "minimizedVideo",
            params: {
                ...offset,
                src: "https://player.vimeo.com/external/565791593.sd.mp4?s=fa438f0a90f8c5c40133e50260d3559008660dc2&profile_id=165&oauth2_token_id=57447761",
                mode: "mini",
                orientation: params.orientation,
            },
        });
        setGlobalModal(null);
    };

    const fullScreenMode = () => {
        videoRef.current.requestFullscreen();
    };

    return (
        <div className={s.minimizedVideo}>
            <div className={s.control}>
                <div className={s.header}>
                    <CropFreeIcon onClick={fullScreenMode} />
                    {params.mode === "mini" ? (
                        <CloseIcon onClick={() => setMovableModal(null)} />
                    ) : (
                        <FullscreenExitIcon onClick={openMinimizedVideo} />
                    )}
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
                            <div
                                className={`${s.volTrack} ${
                                    params.mode === "mini"
                                        ? s.volTrackMinimized
                                        : s.volTrackModal
                                }`}
                            >
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
                src={params.src}
                onDurationChange={(e) => loadDuration(e.target)}
            />
        </div>
    );
});

//volTrackModal
//volTrackMinimized
