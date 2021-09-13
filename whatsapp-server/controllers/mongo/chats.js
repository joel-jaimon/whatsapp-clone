const { ObjectID } = require("bson");
const { mongoDB } = require("../../utils/database");

// Get total chats and groups in database
exports.getGroupsChats = async (req, res) => {
  try {
    const db = await mongoDB().db();
    const chats = await db
      .collection("chats")
      .find({
        participants: {
          $eq: ObjectID(req.payload._id),
        },
      })
      .toArray();
    const groups = await db
      .collection("groups")
      .find({
        participants: {
          $eq: ObjectID(req.payload._id),
        },
      })
      .toArray();

    const fi = [...chats, ...groups].sort((x, y) => x.timestamp - y.timestamp);
    return res.status(201).json({
      data: fi,
    });
  } catch (err) {
    console.log(err);
    res.send(404).end();
  }
};

// get messages corresponding to a chat or group
exports.getMessages = async (req, res) => {
  try {
    const { refId } = req.params;
    const db = await mongoDB().db();
    const messages = await db
      .collection("messages")
      .find({ refId: ObjectID(refId) })
      .sort({ timestamp: 1 })
      .toArray();

    return res.status(201).json({
      data: messages,
    });
  } catch (err) {
    console.log(err);
    res.send(404).end();
  }
};
