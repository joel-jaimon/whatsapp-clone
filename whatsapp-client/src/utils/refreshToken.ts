import { setAccessToken } from "./accessToken";

export const refreshToken = async () => {
  try {
    const data = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/refresh-token`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();
    console.log(res);
    if (res.accessToken) setAccessToken(res.accessToken);
  } catch (err) {
    console.log(err);
  }
};
