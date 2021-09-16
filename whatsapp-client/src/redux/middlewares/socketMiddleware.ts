import { logout, setAuthSuccess, socketDisconnected } from "../reducers/auth";
import {
  getInitialChats,
  recieveMessage,
  sendMsgSuccessful,
  setTotalAuthUsers,
  updateActiveAuthUser,
  updateInactiveAuthUser,
  updateLastViewedChatsTimestampOfOtherUser,
  updateOtherUsersActiveChat,
  updateTotalAuthUsers,
} from "../reducers/chat";
import { setGlobalModal } from "../reducers/globalModal";
import { getActiveSocket } from "../sockets/socketConnection";

export const createSocketMiddleware = () => {
  return (store: any) => (next: any) => (action: any) => {
    // Socket Verified
    getActiveSocket()?.on("signInSuccess", (mainPayload: any) => {
      store.dispatch(setAuthSuccess(mainPayload));
      store.dispatch(getInitialChats());
      getActiveSocket()?.emit("getTotalUsers");

      // Total Users
      getActiveSocket()?.on("updateTotalUsers", (payload: string) => {
        store.dispatch(updateTotalAuthUsers(payload));
      });

      // Update Users
      getActiveSocket()?.on("setInitialTotalUsers", (payload: string) => {
        store.dispatch(setTotalAuthUsers(payload));
      });

      // Handle User's active status
      getActiveSocket()?.on("online", (payload: string) => {
        store.dispatch(updateActiveAuthUser(payload));
      });

      // Handle User's inactive status
      getActiveSocket()?.on("offline", (payload: string) => {
        store.dispatch(updateInactiveAuthUser(payload));
      });

      // Message was successfully sent
      getActiveSocket().on("messageSentSuccessfully", (payload: any) => {
        store.dispatch(sendMsgSuccessful(payload));
      });

      getActiveSocket().on("recieveMessage", (payload: any) => {
        store.dispatch(recieveMessage(payload));
      });

      // // Handle others chat switches
      // getActiveSocket()?.on("activeChatsSwitched", (payload: any) => {
      //   store.dispatch(updateLastViewedChatsTimestampOfOtherUser(payload));
      // });

      // // Handle others active chats
      // getActiveSocket()?.on("friendCurrentlyOn", (payload: any) => {
      //   store.dispatch(updateOtherUsersActiveChat(payload));
      // });

      // Socket Disconnected
      getActiveSocket()?.on("multipleSession", (payload: any) => {
        store.dispatch(
          setGlobalModal({
            type: "multipleSession",
            params: {},
          })
        );
      });

      // Socket Disconnected
      getActiveSocket()?.on("disconnect", (payload: any) => {
        store.dispatch(socketDisconnected());
      });
    });

    return next(action);
  };
};
