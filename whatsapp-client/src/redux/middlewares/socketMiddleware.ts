import { logout, setAuthSuccess } from "../reducers/auth";
import {
  setTotalUsers,
  updateActiveUser,
  updateInactiveUser,
  updateTotalUsers,
} from "../reducers/chat";
import { getActiveSocket } from "../sockets/socketConnection";

export const createSocketMiddleware = () => {
  return (store: any) => (next: any) => (action: any) => {
    console.log("Socket Middleware: ", action);

    // Socket Verified
    getActiveSocket()?.on("signInSuccess", (payload: any) => {
      store.dispatch(setAuthSuccess(payload));
      getActiveSocket()?.emit("getTotalUsers");

      // Total Users
      getActiveSocket()?.on("updateTotalUsers", (payload: string) => {
        store.dispatch(updateTotalUsers(payload));
      });

      // Update Users
      getActiveSocket()?.on("setInitialTotalUsers", (payload: string) => {
        store.dispatch(setTotalUsers(payload));
      });

      // Handle User's active status
      getActiveSocket()?.on("online", (payload: string) => {
        store.dispatch(updateActiveUser(payload));
      });

      // Handle User's inactive status
      getActiveSocket()?.on("offline", (payload: string) => {
        store.dispatch(updateInactiveUser(payload));
      });

      // Socket Disconnected
      getActiveSocket()?.on("disconnect", (payload: any) => {
        store.dispatch(logout());
      });
    });

    return next(action);
  };
};
