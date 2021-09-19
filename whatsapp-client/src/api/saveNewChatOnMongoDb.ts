import { getAccessToken } from "../utils/accessToken";

export const saveNewChatOnMongoDb = async (
  newChatInfo: any,
  endpointPath: string
) => {
  try {
    const data = await fetch(
      `${process.env.REACT_APP_SERVER_URL}${endpointPath}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChatInfo.chatInfo),
      }
    );
    const res = await data.status;
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};
