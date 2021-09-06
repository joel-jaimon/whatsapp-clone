import * as io from "socket.io-client";

//@ts-ignore
let socket = io("http://localhost:8181", {
  withCredentials: true,
});

export default socket;
