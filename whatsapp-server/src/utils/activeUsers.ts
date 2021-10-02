// Only saving objectId of activeUsers
const activeUsers: any = [];

export const addToActiveUsers = (user: any) => {
  activeUsers.push(user);
};

export const getActiveUsers = () => activeUsers;

export const getActiveUserBySocketId = (socketId: any) => {
  return activeUsers.find((e: any) => e.socketId == socketId);
};

export const getActiveUserByObjectId = (objectId: any) => {
  return activeUsers.find((e: any) => e.objectId == objectId);
};

export const removeActiveUserBySocketId = (socketId: any) => {
  activeUsers.splice(
    activeUsers.findIndex((e: any) => e.socketId === socketId),
    1
  );
};

export const removeActiveUserByObjectId = (objectId: any) => {
  activeUsers.splice(
    activeUsers.findIndex((e: any) => e.objectId === objectId),
    1
  );
};
