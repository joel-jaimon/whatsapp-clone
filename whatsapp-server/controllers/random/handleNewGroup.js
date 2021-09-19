const { mongoDB } = require("../../utils/database");

const handleNewGroup = async (req, res) => {
  const db = await mongoDB().db();
  const { tokenId } = req.body;
};

module.exports = { handleNewGroup };
