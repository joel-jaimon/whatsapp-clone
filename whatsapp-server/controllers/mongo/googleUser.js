const handleNewGoogleUser = async (data, db) => {
  await db.collection("googleAuthUsers").insertOne(data);
};

module.exports = { handleNewGoogleUser };
