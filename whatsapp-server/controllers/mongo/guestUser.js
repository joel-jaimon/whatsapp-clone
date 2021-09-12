const { mongoDB } = require("../../utils/database");

const handleNewGuestUser = async (data, db) => {
  await mongoDB().db().collection("guestUsers").insertOne(data);
};

module.exports = { handleNewGuestUser };
