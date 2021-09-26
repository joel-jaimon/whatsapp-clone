import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const setActiveSocket = (
  activeSocket: Socket<DefaultEventsMap, DefaultEventsMap>
) => {
  socket = activeSocket;
};

export const getActiveSocket = () => socket;
