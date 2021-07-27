import { Avatar } from "@material-ui/core";
import s from "./chatContainerHeader.module.scss";

export const ChatContainerHead = ({ setModal }: any) => {
  return (
    <div className={s.chatContainerHead}>
      <div
        onClick={() =>
          setModal({
            type: "userinfoModal",
          })
        }
        className={s.roomA}
      >
        <span className={s.avatar}>
          <img src="https://i.pravatar.cc/300" />
        </span>
        <div className={s.roomInfo}>
          <p>Room Id</p>
          <small>Info</small>
        </div>
      </div>

      <div className={s.roomControls}>
        <span
          onClick={() =>
            setModal({
              type: "searchMsg",
            })
          }
          className="icons"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
            ></path>
          </svg>
        </span>
        <span className="icons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
};
