import s from "./uservideo.module.scss";

export const UserVideo = ({ src }: any) => {
    return (
        <div className={s.userVideo}>
            <div className={s.smokeControl}></div>
            <div className={s.video}>
                <video loop={true} autoPlay={true} src={src} />
            </div>
        </div>
    );
};
