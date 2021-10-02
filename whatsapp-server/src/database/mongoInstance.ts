import * as mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@whatsapp-clone-mongodb.bgdrv.mongodb.net/whatsapp-clone?retryWrites=true&w=majority`;

// mongo db instance
let db: any;

// initial config
export const inititalizeMongoDb = async () => {
  try {
    const client = await MongoClient.connect(mongoURI);
    db = client;
    return db;
  } catch {}
};

// get mongo instance
export const mongoDB = () => db;
