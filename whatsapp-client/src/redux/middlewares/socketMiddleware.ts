import { logout, setAuthSuccess, socketDisconnected } from "../reducers/auth";
import {
  getInitialChats,
  setTotalAuthUsers,
  updateActiveAuthUser,
  updateInactiveAuthUser,
  updateTotalAuthUsers,
} from "../reducers/chat";
import { setGlobalModal } from "../reducers/globalModal";
import { getActiveSocket } from "../sockets/socketConnection";

export const createSocketMiddleware = () => {
  return (store: any) => (next: any) => (action: any) => {
    // Socket Verified
    getActiveSocket()?.on("signInSuccess", (payload: any) => {
      store.dispatch(setAuthSuccess(payload));
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
