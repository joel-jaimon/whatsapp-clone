import { mongoDB } from "../../utils/database";

export const handleNewGuestUser = async (data: any) => {
  await mongoDB().db().collection("guestUsers").insertOne(data);
};
