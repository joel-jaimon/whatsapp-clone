import * as socket from "socket.io";
import { getActiveUserByObjectId } from "../../utils/activeUsers";

export const getTotalUsers = (
  socket: socket.Socket,
  users: any,
  _id: string
) => {
  // get total users (less size compared to chat data so we can use socket.io here,
  // otherwise its better to use REST)
  const filterUsers = users
    .filter((me: any) => me._id != _id)
    .map((user: any) => {
      return {
        ...user,
        status: getActiveUserByObjectId(user._id.toString()) ? true : false,
      };
    });

  // emit the entire user list to client
  socket.emit("setInitialTotalUsers", filterUsers);
};
