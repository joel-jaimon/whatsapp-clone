// Only saving objectId of activeUsers
const activeUsers = [];

const addToActiveUsers = (user) => {
  activeUsers.push(user);
};

const getActiveUsers = () => activeUsers;

const getActiveUserBySocketId = (socketId) => {
  return activeUsers.find((e) => e.socketId === socketId);
};

const getActiveUserByObjectId = (objectId) => {
  return activeUsers.find((e) => e.objectId === objectId);
};

const removeActiveUserBySocketId = (socketId) => {
  activeUsers.splice(
    activeUsers.findIndex((e) => e.socketId === socketId),
    1
  );
};

const removeActiveUserByObjectId = (objectId) => {
  activeUsers.splice(
    activeUsers.findIndex((e) => e.objectId === objectId),
    1
  );
};

module.exports = {
  addToActiveUsers,
  getActiveUsers,
  getActiveUserBySocketId,
  getActiveUserByObjectId,
  removeActiveUserBySocketId,
  removeActiveUserByObjectId,
};
