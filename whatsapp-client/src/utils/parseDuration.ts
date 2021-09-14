export const getDuration = (secs: number) => {
  const seconds = Math.floor(secs % 60);
  const minutes = Math.floor(secs / 60);
  const formatedMins = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formatedSecs = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formatedMins}:${formatedSecs}`;
};
