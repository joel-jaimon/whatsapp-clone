import s from "./messages.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useState } from "react";
import { formatTime } from "utils/formatTime";
import { SeenStats } from "components/SeenStats/SeenStats";

export const File = ({
  msgPosition,
  msgParams,
  timestamp,
  extraParam,
  stillSending,
}: any) => {
  const { fileName, fileSize, url } = msgParams;
  const [loading, setLoading] = useState(false);

  function save(data: any) {
    const blob = new Blob([data], { type: "application/zip" });
    //@ts-ignore
    if (window.navigator.msSaveOrOpenBlob) {
      //@ts-ignore
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const elem = window.document.createElement("a");
      elem.href = window.URL.createObjectURL(blob);
      elem.download = msgParams.fileName;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
    setLoading(false);
  }

  const downloadFile = async () => {
    setLoading(true);
    const blob = await fetch(url).then((r) => r.blob());
    save(blob);
  };

  return (
    <span className={msgPosition === "right" ? s.fileRight : s.fileLeft}>
      <div className={s.file}>
        {extraParam?.owner || extraParam.prevMsgBySameUser ? null : (
          <div
            style={{
              color: extraParam.color,
            }}
            className={s.sentBy}
          >
            {extraParam.by}
          </div>
        )}
        <div className={s.fileControl}>
          <div>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA8CAYAAADL94L/AAAByElEQVR4Ae3axdJTQRAFYFyegA3u8ALseCDcicsGhxt3x+G32BXc3X3NBnfXYTqp3sZlhuqpOlXZRL46He9ReJyJxGSTEreaPfEHZiX+1uSJvelVNu+Jvjd7Yk9zI8aSUe0eDpjCIYfNSuw5v/zF5In/6mU27478tXriLJvXjdSwPq1lCDTCmxjiCNav8GZYBVMwWKagX8kWjk9vCcMhYWhEFEw1+oV0wZjdPKY6Vn9EwmBDTYPwBoXCYPLGDQTJjkHQNQRJj0FQtmgs+C8wOHIIkh2DoDu5vD5Xfkz9hsTBWDyxhjDYUDqvLRYSY1JilSQGyyxXOt4QKJPX70NDQmI27gyxHcn9bH/5RFMNAUgoDI4afOAMHBiCdiDNj5woGAhgsCEYudSI1lBCRwoPL957slAoDDYEoPXb/ZVs3FE/y9072fDxsx4BMPVfGOpl1VY/y5++4EWM1Fm9LcCKpy8RpnchDGEIQxjCEIYwhCEMYQhDGMIQhjCEIQxhCEMYwhCGMIQhDGEIQxhYNlXiP+XHXLRDM5thQVpyzIfS2YtLceVEkRmzalsgMArPhp258bA6b/LEb8LqPM930VNdvY/fhMmCxw+Of+4BTcPInBo2AAAAAElFTkSuQmCC"
              alt="file"
            />
            <small>{`${fileName.slice(0, 25)}...`}</small>
          </div>
          {!loading ? (
            <svg
              onClick={downloadFile}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34 34"
              width="34"
              height="34"
            >
              <path
                fill="currentColor"
                d="M17 2c8.3 0 15 6.7 15 15s-6.7 15-15 15S2 25.3 2 17 8.7 2 17 2m0-1C8.2 1 1 8.2 1 17s7.2 16 16 16 16-7.2 16-16S25.8 1 17 1z"
              ></path>
              <path
                fill="currentColor"
                d="M22.4 17.5h-3.2v-6.8c0-.4-.3-.7-.7-.7h-3.2c-.4 0-.7.3-.7.7v6.8h-3.2c-.6 0-.8.4-.4.8l5 5.3c.5.7 1 .5 1.5 0l5-5.3c.7-.5.5-.8-.1-.8z"
              ></path>
            </svg>
          ) : (
            <CircularProgress size={"26px"} />
          )}
        </div>
        <div className={s.fileInfo}>
          <div>
            <small>{fileName.split(".")[1].toUpperCase()}</small>
            <small>{fileSize}</small>
          </div>
          {extraParam.owner ? (
            <div className={s._A}>
              <small>{formatTime(timestamp)}</small>
              <SeenStats
                type={stillSending ? -1 : extraParam.seenStatus}
              />{" "}
            </div>
          ) : (
            <small>{formatTime(timestamp)}</small>
          )}
        </div>
      </div>
    </span>
  );
};
