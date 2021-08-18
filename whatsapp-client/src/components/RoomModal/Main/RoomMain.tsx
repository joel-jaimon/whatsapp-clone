import s from "./main.module.scss";
import { UserVideo } from "./Video/UserVideo";

const dummy = [
    "https://player.vimeo.com/external/566289583.sd.mp4?s=69d783da850f9e527aeb765f469eac15989ab210&profile_id=164&oauth2_token_id=57447761",
    "https://player.vimeo.com/external/569444235.sd.mp4?s=3d3cbc8f8053d28a33ab60ee3492ab178d898c6d&profile_id=165&oauth2_token_id=57447761",
    "https://player.vimeo.com/external/564533846.sd.mp4?s=39ab1e86ee2fe197a612319b10ae700fe7788b54&profile_id=165&oauth2_token_id=57447761",
    "https://player.vimeo.com/external/582434262.sd.mp4?s=459c132a9f83711ca5dee9c9d00a9d37c3c24bc2&profile_id=165&oauth2_token_id=57447761",
];

export const RoomMain = () => {
    return (
        <div className={s.roomMain}>
            {dummy.map((e: any, i: number) => {
                return <UserVideo src={e} key={i} />;
            })}
        </div>
    );
};
