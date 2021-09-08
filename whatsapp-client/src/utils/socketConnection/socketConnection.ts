import * as io from "socket.io-client";

let socket: any = null;

if (!socket) {
  //@ts-ignore
  socket = io("http://localhost:8181", {
    withCredentials: true,
  });
}

export default socket;
