import { Emojees } from "../Emojees/Emojees";
import s from "./activityStyles.module.scss";

export const Activity = () => {
  return (
    <div className={s.activity}>
      <Emojees />
    </div>
  );
};
