let accessToken: any = null;

export const setAccessToken = (newAccessToken: string) => {
  accessToken = newAccessToken;
};

export const getAccessToken = () => accessToken;
