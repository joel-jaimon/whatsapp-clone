import { forwardRef } from "react";
import { EmojiDrawerAnimation } from "animations/chatFooterAnimation/EmojiDrawerAnimation";
import { Emojees } from "../Emojees/Emojees";
import s from "./activityStyles.module.scss";

export const Activity = forwardRef(
  ({ onClose, reverseActivityAnimation, ...otherProps }: any, ref: any) => {
    return (
      <EmojiDrawerAnimation
        className={s.activity}
        onClose={onClose}
        reverse={reverseActivityAnimation}
      >
        <Emojees ref={ref} {...otherProps} />
      </EmojiDrawerAnimation>
    );
  }
);
