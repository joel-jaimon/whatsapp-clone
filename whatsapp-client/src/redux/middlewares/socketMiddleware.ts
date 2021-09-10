import { logout, setAuthSuccess } from "../reducers/auth";
import { getActiveSocket } from "../sockets/socketConnection";

export const createSocketMiddleware = () => {
  const handleSocketDisconnect = (payload: any, store: any) => {
    store.dispatch(logout());
  };
  const handleSignInSuccess = (payload: any, store: any) => {
    store.dispatch(setAuthSuccess(payload));
  };

  return (store: any) => (next: any) => (action: any) => {
    console.log("Socket Middleware: ", action);

    // Socket Verified
    getActiveSocket()?.on("signInSuccess", (payload: any) =>
      handleSignInSuccess(payload, store)
    );

    // Socket Disconnected
    getActiveSocket()?.on("disconnect", (payload: any) =>
      handleSocketDisconnect(payload, store)
    );
    return next(action);
  };
};
