const handleNewGuestUser = async (data, db) => {
  await db.collection("guestUsers").insertOne(data);
};

module.exports = { handleNewGuestUser };
