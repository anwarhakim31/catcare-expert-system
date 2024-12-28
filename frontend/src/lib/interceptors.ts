import axios from "axios";

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
  "cache-control": "no-cache",

  Expire: 0,
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers,
  timeout: 60 * 1000,
});

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2 && parts) return parts[1].split(";")[0];
  return null;
};
instance.interceptors.request.use(
  async (config) => {
    const token = getCookie("catcare");

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
