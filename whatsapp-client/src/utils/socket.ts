import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { setActiveSocket } from "../config/globalSocket";
import { setAuthSuccess, socketDisconnected } from "redux/reducers/auth";
import {
  getInitialChats,
  groupInfoUpdateSuccessfull,
  recieveMessage,
  sendMsgSuccessful,
  setTotalAuthUsers,
  updateActiveAuthUser,
  updateAuthUsersInfo,
  updateChats,
  updateInactiveAuthUser,
  updateTotalAuthUsers,
} from "redux/reducers/chat";
import { setGlobalModal } from "redux/reducers/globalModal";
import store from "redux/store";
import { othersCalling } from "redux/reducers/callerInfo";
import { setNewConnection } from "redux/reducers/roomModal";

export class SocketIO {
  private socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  public constructor(serverUrl: string, accessToken: string) {
    this.socket = io(serverUrl, {
      // Set cred to false as no need to send cookies
      withCredentials: false,
      auth: (cb) => {
        cb({
          accessToken,
        });
      },
    });
  }

  private configure() {
    // Socket Verified
    this.socket?.on("signInSuccess", (mainPayload: any) => {
      store.dispatch(setAuthSuccess(mainPayload));

      store.dispatch(getInitialChats());
      this.socket?.emit("getTotalUsers");

      // Total Users
      this.socket?.on("updateTotalUsers", (payload: string) => {
        store.dispatch(updateTotalAuthUsers(payload));
      });

      // Update Users
      this.socket?.on("setInitialTotalUsers", (payload: string) => {
        store.dispatch(setTotalAuthUsers(payload));
      });

      // Handle User's active status
      this.socket?.on("online", (payload: string) => {
        store.dispatch(updateActiveAuthUser(payload));
      });

      // Handle User's inactive status
      this.socket?.on("offline", (payload: string) => {
        store.dispatch(updateInactiveAuthUser(payload));
      });

      // Message was successfully sent
      this.socket.on("messageSentSuccessfully", (payload: any) => {
        store.dispatch(sendMsgSuccessful(payload));
      });

      this.socket.on("recieveMessage", (payload: any) => {
        store.dispatch(recieveMessage(payload));
      });

      this.socket.on("onOtherAuthUsersInfoUpdate", (payload: any) => {
        store.dispatch(updateAuthUsersInfo(payload));
      });

      this.socket.on("onGroupInfoUpdate", (payload: any) => {
        store.dispatch(groupInfoUpdateSuccessfull(payload));
      });

      this.socket.on("incomingCall", (payload: any) => {
        store.dispatch(othersCalling(payload));
      });

      this.socket.on("incomingCallCanceledByOther", (payload: any) => {
        store.dispatch(othersCalling(null));
      });

      this.socket.on("user-connected-to-vc", (payload: any) => {
        store.dispatch(setNewConnection(payload));
      });

      // // Handle others chat switches
      // this.socket?.on("activeChatsSwitched", (payload: any) => {
      //   store.dispatch(updateLastViewedChatsTimestampOfOtherUser(payload));
      // });

      // // Handle others active chats
      // this.socket?.on("friendCurrentlyOn", (payload: any) => {
      //   store.dispatch(updateOtherUsersActiveChat(payload));
      // });

      // Socket Disconnected
      this.socket?.on("multipleSession", (payload: any) => {
        store.dispatch(
          setGlobalModal({
            type: "multipleSession",
            params: {},
          })
        );
      });

      this.socket?.on("updateExistingChats", (payload: any) => {
        store.dispatch(updateChats(payload));
      });

      // Socket Disconnected
      this.socket?.on("disconnect", (payload: any) => {
        store.dispatch(socketDisconnected());
      });
    });
  }

  public async getActiveSocket(): Promise<
    Socket<DefaultEventsMap, DefaultEventsMap>
  > {
    return await new Promise((resolve) => {
      this.socket.on("connect", () => {
        this.configure();
        setActiveSocket(this.socket);
        resolve(this.socket);
      });
    });
  }
}
