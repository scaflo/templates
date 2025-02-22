import axios from "axios";
import store from "../redux/store";

// API Base URL
const API_BASE_URL = "http://localhost:3000/";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
export const deleteApiCaller = ({ uri }) => {
  return api.delete(uri);
};

// apiCaller
export const apiCaller = ({ uri, method = "GET", data = {}, contentType }) => {
  return new Promise((resolve, reject) => {
    const config = {
      method,
      url: API_BASE_URL + uri,
      headers: {
        "Content-Type": contentType || "application/json",
        Accept: "/",
      },
      data,
    };

    console.log(config, ":config");

    api(config)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const HttpClient = {
  apiCaller,
  API_BASE_URL,
  deleteApiCaller,
};
