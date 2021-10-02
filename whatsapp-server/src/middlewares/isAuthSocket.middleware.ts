import { verify } from "jsonwebtoken";

// Socket.io middleware
export const isAuthSocket = (socket: any, next: any) => {
  const { accessToken }: any = socket.handshake.auth;
  verify(
    accessToken,
    process.env.JWT_ACCESS_SECRET,
    (err: any, payload: any) => {
      if (err) {
        socket.disconnect(true);
        return next(new Error("Not Authorized!"));
      }
      return next();
    }
  );
};
