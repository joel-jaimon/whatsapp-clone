import { verify } from "jsonwebtoken";

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
