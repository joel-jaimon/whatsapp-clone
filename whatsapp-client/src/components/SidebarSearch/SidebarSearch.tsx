import s from "./sidebarSearchStyles.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useRef, useState } from "react";

export const SidebarSearch = () => {
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [back, setBack] = useState(false);

  return (
    <div className={s.search}>
      <div className={s.searchbar}>
        <span className={s.searchIcon}>
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
        <div className={s.searchControls}>
          <input
            onFocus={() => setBack(true)}
            placeholder="Search or start new chat"
          />
          {inputFocused && !loading ? (
            <span className={s.searchIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
              >
                <path
                  fill="currentColor"
                  d="M17.25 7.8L16.2 6.75l-4.2 4.2-4.2-4.2L6.75 7.8l4.2 4.2-4.2 4.2 1.05 1.05 4.2-4.2 4.2 4.2 1.05-1.05-4.2-4.2 4.2-4.2z"
                ></path>
              </svg>
            </span>
          ) : null}
          {loading ? (
            <CircularProgress
              size={15}
              style={{
                color: "#3cb362",
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
