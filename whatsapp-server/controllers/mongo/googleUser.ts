import { mongoDB } from "../../utils/database";

export const handleNewGoogleUser = async (data: any) => {
  await mongoDB().db().collection("googleAuthUsers").insertOne(data);
};
