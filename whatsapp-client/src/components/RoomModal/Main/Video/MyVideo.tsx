import { getActiveSocket } from "config/globalSocket";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { setGlobalModal } from "redux/reducers/globalModal";
import { resetRoomModal } from "redux/reducers/roomModal";
import { UserVideo } from "./UserVideo";
import s from "./uservideo.module.scss";

const passStateToProps = ({ globalModal, roomModal }: any) => ({
  globalModal: globalModal.modal,
  room: roomModal.modal,
  newConnection: roomModal.newConnection,
  micStatus: roomModal.micStatus,
  videoStatus: roomModal.videoStatus,
  disconnectCall: roomModal.disconnectCall,
});

const passDispatchToProps = (dispatch: any) => ({
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
  resetRoomModal: () => dispatch(resetRoomModal()),
});

export const MyVideo = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    room,
    setVideos,
    newConnection,
    micStatus,
    videoStatus,
    disconnectCall,
    resetRoomModal,
  }: any) => {
    const myVideoRef: any = useRef();
    const peerConnectionRef: { current: Peer | undefined } = useRef();
    const [loading, setLoading] = useState(true);
    const [stream, setStream] = useState<MediaStream>();

    useEffect(() => {
      setLoading(true);
      const peer = new Peer(undefined, {
        host: `${process.env.REACT_APP_PEER_SERVER_URL?.split(":")[1].slice(
          2
        )}`,
        port: parseInt(
          `${process.env.REACT_APP_PEER_SERVER_URL?.split(":")[2]}`
        ),
        path: "/peer-server",
      });

      peerConnectionRef.current = peer;

      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream: MediaStream) => {
          // Play your own stream in this component
          myVideoRef.current.srcObject = stream;
          myVideoRef.current.play();
          if (!room.acceptedCall)
            getActiveSocket().emit("callOtherUser", room.extraParam);
          peer.on("call", (call: Peer.MediaConnection) => {
            // Answer for that call will be our stream
            call.answer(stream);
            // When we recieve their streamlk
            call.on("stream", (otherStream: MediaStream) => {
              setVideos((prev: any) => ({
                ...prev,
                [otherStream.id]: (
                  <UserVideo key={otherStream.id} stream={otherStream} />
                ),
              }));
            });
          });
          setLoading(false);
          setStream(stream);
        })
        .catch((e) => {
          if (e.message === "Permission denied") {
            setGlobalModal({
              type: "cameraDenied",
              params: {},
            });
          }
        });

      peer.on("open", (myPeerId: string) => {
        // When we first open the app, have us join a room
        getActiveSocket().emit("join-vc-room", room.peerId, myPeerId);
      });
    }, []);

    const connectToNewUser = (otherPeerUserId: string) => {
      try {
        setTimeout(() => {
          //@ts-ignore
          const call = peerConnectionRef.current.call(
            otherPeerUserId,
            //@ts-ignore
            stream
          ); // Call the user who just joined 2
          console.log(call);
          call.on("stream", (userVideoStream) => {
            console.log(userVideoStream);
            setVideos((prev: any) => ({
              ...prev,
              [userVideoStream.id]: (
                <UserVideo key={userVideoStream.id} stream={userVideoStream} />
              ),
            }));
          });
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      if (newConnection) {
        connectToNewUser(newConnection);
      }
    }, [newConnection]);

    const toggleTrack = (bool: boolean, kind: string) => {
      if (stream?.getTracks()) {
        const tracks: MediaStreamTrack[] = stream?.getTracks();
        const track = tracks.filter(
          (track: MediaStreamTrack) => track.kind === kind
        )[0];
        track.enabled = bool;
        console.log(`${track.enabled ? "unmuted" : "muted"} track.kind`);
      }
    };

    const disconnectFromCall = () => {
      toggleTrack(videoStatus, "video");
      toggleTrack(micStatus, "audio");
      peerConnectionRef.current!.destroy();
      if (stream?.getTracks()) {
        const tracks: MediaStreamTrack[] = stream?.getTracks();
        tracks.forEach((track: MediaStreamTrack) => track.stop());
      }
      setTimeout(() => {
        resetRoomModal();
      }, 500);
    };

    useEffect(() => {
      toggleTrack(micStatus, "audio");
    }, [micStatus]);

    useEffect(() => {
      toggleTrack(videoStatus, "video");
    }, [videoStatus]);

    useEffect(() => {
      if (disconnectCall) {
        disconnectFromCall();
      }
    }, [disconnectCall]);

    return (
      <div className={s.userVideo}>
        <div className={s.video}>
          <div className={s.smokeControl}>
            {loading ? (
              <div className={s.loading}>
                <svg
                  version="1.0"
                  width="40px"
                  height="40px"
                  viewBox="0 0 128 128"
                >
                  <path
                    fill="#00af9c"
                    d="M64.4 16a49 49 0 0 0-50 48 51 51 0 0 0 50 52.2 53 53 0 0 0 54-52c-.7-48-45-55.7-45-55.7s45.3 3.8 49 55.6c.8 32-24.8 59.5-58 60.2-33 .8-61.4-25.7-62-60C1.3 29.8 28.8.6 64.3 0c0 0 8.5 0 8.7 8.4 0 8-8.6 7.6-8.6 7.6z"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 64 64"
                      to="360 64 64"
                      dur="600ms"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </path>
                </svg>
              </div>
            ) : null}
          </div>
          <video ref={myVideoRef} muted={true} />
        </div>
      </div>
    );
  }
);
