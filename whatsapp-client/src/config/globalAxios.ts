import axios, { AxiosRequestConfig } from "axios";
import { getAccessToken } from "utils/accessToken";
import { refreshToken } from "utils/refreshToken";

const globalAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

globalAxios.interceptors.request.use(
  async (request: AxiosRequestConfig<any>) => {
    request.headers!.Authorization = `Bearer ${getAccessToken()}`;
    return request;
  },
  (error) => {
    console.log(error);
  }
);

globalAxios.interceptors.response.use(
  async (response: AxiosRequestConfig<any>) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    console.log(error);
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        await refreshToken();
        //@ts-ignore
        globalAxios.defaults.headers!.common.Authorization = `Bearer ${getAccessToken()}`;
        return globalAxios(originalConfig);
      } catch (_error) {
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }

        return Promise.reject(_error);
      }
    }

    if (error.response.status === 403 && error.response.data) {
      return Promise.reject(error.response.data);
    }
  }
);

export { globalAxios };
