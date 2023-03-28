import axios from "axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const http = axios.create({
  baseURL: import.meta.env.PROD ? "/api" : import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "content-type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");

    if (token !== "" && token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (err) => Promise.reject(err)
);

http.interceptors.response.use(
  (response) => {
    let { token } = response.data;
    if (token) {
      localStorage.setItem("token", token);
    }

    return response;
  },
  (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      localStorage.removeItem("token");
      // history.push("/");
      // window.history.pushState({}, "", "/");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default http;
