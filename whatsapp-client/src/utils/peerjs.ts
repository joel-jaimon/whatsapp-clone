import Peer from "peerjs";

export const peer = new Peer(undefined, {
  host: `${process.env.REACT_APP_PEER_SERVER_URL?.split(":")[1].slice(2)}`,
  port: parseInt(`${process.env.REACT_APP_PEER_SERVER_URL?.split(":")[2]}`),
  path: "/peer-server",
});
