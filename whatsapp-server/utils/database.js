const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@whatsapp-clone-mongodb.bgdrv.mongodb.net/whatsapp-clone?retryWrites=true&w=majority`;

let db;

const inititalizeMongoDb = async () => {
  try {
    const client = await MongoClient.connect(mongoURI);
    db = client;
    return db;
  } catch {}
};

const mongoDB = () => db;

module.exports = { mongoDB, inititalizeMongoDb };
