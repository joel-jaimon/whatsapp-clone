import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import s from "./skeleton.module.scss";

export const SidebarChatSkeletons = () => {
  return (
    <SkeletonTheme color="#202020" highlightColor="#444">
      <div className={s.loadingChat}>
        <Skeleton
          className={s.sn_avatar}
          circle={true}
          height={45}
          width={45}
        />
        <div className={s.sn_div}>
          <Skeleton height={14} width={50} className={s.sn_name} />
          <Skeleton height={10} width={150} className={s.sn_msg} />
        </div>
      </div>
    </SkeletonTheme>
  );
};
