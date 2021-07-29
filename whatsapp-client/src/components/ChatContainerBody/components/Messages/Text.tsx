import s from "./messages.module.scss";

export const Text = ({ type }: any) => {
  return (
    <span className={type === "right" ? s.textRight : s.textLeft}>
      <p className={s.text}>
        Hey guys! I have been working on this app lately, so I would really
        appreciate if you could download this app from google playstore.
        <br /> <br /> This app is now <strong>live</strong>. Please give your
        valuable feedback and don't forget to rate it if you like.
      </p>
    </span>
  );
};
