import { verify } from "jsonwebtoken";
import { removeActiveUserBySocketId } from "./activeUsers";

// Express REST routes middleware
export const isAuthREST = (req: any, res: any, next: any) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authorized!");
  }

  try {
    const token: any = authorization.split(" ")[1];
    const payload: any = verify(token, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (err) {
    console.log(err);
    res.status(401);
  } finally {
    return next();
  }
};

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
