const { mongoDB } = require("../../utils/database");

const handleNewGoogleUser = async (data) => {
  await mongoDB().db().collection("googleAuthUsers").insertOne(data);
};

module.exports = { handleNewGoogleUser };
