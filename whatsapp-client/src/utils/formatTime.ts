export const formatTime = (timestamp: number) => {
    const parsedTime = new Date(timestamp).toString().slice(16, 21).split(":");
    const time = `${
        parseInt(parsedTime[0]) < 12
            ? parsedTime[0]
            : parseInt(parsedTime[0]) - 12
    }:${parsedTime[1]} ${parseInt(parsedTime[0]) < 12 ? "AM" : "PM"}`;
    return time;
};
