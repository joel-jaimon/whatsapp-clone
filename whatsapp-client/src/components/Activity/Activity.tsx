import { forwardRef } from "react";
import { Emojees } from "../Emojees/Emojees";
import s from "./activityStyles.module.scss";

export const Activity = forwardRef((props: any, ref: any) => {
  return (
    <div className={s.activity}>
      <Emojees ref={ref} />
    </div>
  );
});
